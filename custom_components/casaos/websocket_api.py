"""Comandi WebSocket di CasaOS.

Il pannello parla con l'integrazione da qui. La scrittura è riservata agli
amministratori: il cliente finale usa la casa, non la riconfigura.

Nota di sicurezza, da non fraintendere: `require_admin` qui è un confine di
*integrità*, non di sicurezza assoluta. Home Assistant non applica un controllo
per servizio sulle chiamate, quindi un utente non amministratore può comunque
comandare le entità dalla console del browser. Serve a impedire che la
configurazione della casa venga cambiata per sbaglio, non a fermare chi vuole
davvero fare danni — quello si ottiene con gli utenti di HA, non qui.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DATA_ARCHIVIO, DOMAIN
from .store import ErroreConfigurazione


def _archivio(hass: HomeAssistant):
    return hass.data[DOMAIN][DATA_ARCHIVIO]


@websocket_api.websocket_command({vol.Required("type"): "casaos/config/get"})
@callback
def ws_config_get(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Legge la configurazione della casa."""
    connection.send_result(msg["id"], _archivio(hass).dati)


@websocket_api.websocket_command({vol.Required("type"): "casaos/config/subscribe"})
@callback
def ws_config_subscribe(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Si iscrive ai cambi di configurazione.

    È ciò che fa sì che una modifica fatta dal telefono compaia sul tablet a
    muro senza ricaricare nulla.
    """

    @callback
    def inoltra(config: dict[str, Any]) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], config))

    connection.subscriptions[msg["id"]] = _archivio(hass).aggiungi_ascoltatore(inoltra)
    connection.send_result(msg["id"], _archivio(hass).dati)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "casaos/config/set",
        vol.Required("config"): dict,
        # Se assente, il salvataggio non controlla di essere partito dall'ultima
        # revisione: serve all'importazione, non all'uso normale.
        vol.Optional("base_rev"): vol.Any(int, None),
    }
)
@websocket_api.async_response
async def ws_config_set(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Salva la configurazione della casa."""
    try:
        salvata = await _archivio(hass).async_salva(msg["config"], msg.get("base_rev"))
    except ErroreConfigurazione as err:
        connection.send_error(msg["id"], "configurazione_non_valida", str(err))
        return
    connection.send_result(msg["id"], {"rev": salvata["rev"]})


@websocket_api.websocket_command({vol.Required("type"): "casaos/config/entita_mancanti"})
@callback
def ws_entita_mancanti(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Elenca le entità citate in configurazione che Home Assistant non conosce.

    Serve dopo l'importazione da un'altra casa e quando un dispositivo viene
    sostituito: sono i casi in cui la dashboard mostrerebbe riquadri muti senza
    dire perché.
    """
    config = _archivio(hass).dati
    citate: list[str] = []

    for chiave in ("luci", "prese", "dispositivi", "telecamere", "scene", "sensori"):
        citate += [v["entity_id"] for v in config.get(chiave, [])]
    ingressi = config.get("ingressi", {})
    citate += [v["entity_id"] for v in ingressi.get("cancelli", [])]
    citate += [v["entity_id"] for v in ingressi.get("porte", [])]
    clima = config.get("clima", {})
    if clima.get("riscaldamento"):
        citate.append(clima["riscaldamento"]["entity_id"])
    citate += [v["entity_id"] for v in clima.get("raffrescamento", [])]
    citate += [v for v in config.get("energia", {}).values() if isinstance(v, str)]
    if isinstance(config.get("meteo"), str):
        citate.append(config["meteo"])
    for voce in config.get("persone", []):
        for chiave in ("presenza", "batteria", "stato_batteria"):
            if isinstance(voce.get(chiave), str):
                citate.append(voce[chiave])

    mancanti = sorted({e for e in citate if hass.states.get(e) is None})
    connection.send_result(msg["id"], {"mancanti": mancanti, "citate": len(set(citate))})


@callback
def async_registra_comandi(hass: HomeAssistant) -> None:
    """Registra tutti i comandi. Va chiamata una volta per avvio di HA."""
    websocket_api.async_register_command(hass, ws_config_get)
    websocket_api.async_register_command(hass, ws_config_subscribe)
    websocket_api.async_register_command(hass, ws_config_set)
    websocket_api.async_register_command(hass, ws_entita_mancanti)
