"""CasaOS — pannello domotico integrato in Home Assistant.

Registra un pannello React nella barra laterale di HA. Il pannello NON gira in
un iframe (embed_iframe=False): riceve quindi l'oggetto `hass` dal frontend di
Home Assistant, gia' autenticato come l'utente che ha fatto login. E' la ragione
per cui questa integrazione sostituisce interamente il vecchio backend Express
(autenticazione, proxy REST, proxy WebSocket, proxy HLS delle telecamere).
"""

from __future__ import annotations

import logging
import os

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    DATA_ARCHIVIO,
    DATA_COMANDI_REGISTRATI,
    DATA_STATIC_REGISTERED,
    DOMAIN,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL,
    VERSION,
)
from .store import ArchivioCasaOS
from .websocket_api import async_registra_comandi

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Avvia CasaOS: serve il bundle del pannello e lo registra in sidebar."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
    if not os.path.isdir(frontend_dir):
        _LOGGER.error(
            "Bundle del pannello assente in %s. "
            "Esegui `npm install && npm run build` in frontend-src/ prima di "
            "installare l'integrazione (la build non viene fatta da HACS).",
            frontend_dir,
        )
        return False

    # Le static path si registrano una sola volta per avvio di HA: ripetere la
    # registrazione dopo un reload dell'entry solleverebbe RuntimeError.
    if not domain_data.get(DATA_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(PANEL_URL, frontend_dir, cache_headers=True)]
        )
        domain_data[DATA_STATIC_REGISTERED] = True

    # Cache-buster: la versione da sola non basta in sviluppo, dove il bundle
    # viene ricompilato molte volte sotto la stessa versione e il browser del
    # tablet continuerebbe a servire quello vecchio. Il tempo di modifica del
    # file cambia a ogni build e a ogni aggiornamento, quindi copre entrambi.
    bundle = os.path.join(frontend_dir, "casaos-panel.js")
    revisione = int(await hass.async_add_executor_job(os.path.getmtime, bundle))

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=DOMAIN,
        webcomponent_name="casaos-panel",
        module_url=f"{PANEL_URL}/casaos-panel.js?v={VERSION}.{revisione}",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        # Senza iframe il pannello riceve `hass`. E' il cardine dell'architettura.
        embed_iframe=False,
        # Il pannello e' visibile a tutti; le operazioni di scrittura saranno
        # protette singolarmente lato comandi WebSocket (require_admin).
        require_admin=False,
        config={"version": VERSION, "static": PANEL_URL},
    )

    # La configurazione della casa vive qui, non in un file JSON e non nel
    # localStorage di un browser: è una sola, ed è la stessa su ogni dispositivo.
    archivio = domain_data.get(DATA_ARCHIVIO)
    if archivio is None:
        archivio = ArchivioCasaOS(hass)
        await archivio.async_carica()
        domain_data[DATA_ARCHIVIO] = archivio

    # I comandi WebSocket si registrano una volta per avvio di HA: ripetere la
    # registrazione dopo un reload dell'entry solleverebbe un errore.
    if not domain_data.get(DATA_COMANDI_REGISTRATI):
        async_registra_comandi(hass)
        domain_data[DATA_COMANDI_REGISTRATI] = True

    domain_data[entry.entry_id] = {}
    _LOGGER.info(
        "CasaOS %s avviato — pannello su /%s, configurazione alla revisione %s",
        VERSION,
        DOMAIN,
        archivio.dati.get("rev", 0),
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Rimuove il pannello dalla sidebar.

    La static path resta registrata: HA non espone un modo per rimuoverla a
    caldo, ed e' innocua (serve solo file statici).
    """
    frontend.async_remove_panel(hass, DOMAIN)
    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return True
