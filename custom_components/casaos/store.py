"""Configurazione della casa, salvata dentro Home Assistant.

Sostituisce i file JSON di CasaOS v1 e le chiavi `localStorage` sparse nei
browser. Conseguenze pratiche: la configurazione è una sola per casa, sopravvive
alla pulizia della cache, ed è la stessa sul tablet a muro e sul telefono —
modificarla da un dispositivo la aggiorna sull'altro nello stesso secondo.

Il campo `rev` serve a non perdere modifiche: chi salva dichiara da quale
revisione è partito, e se nel frattempo qualcun altro ha salvato, il salvataggio
viene rifiutato invece di sovrascrivere in silenzio.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION

_LOGGER = logging.getLogger(__name__)


def configurazione_vuota() -> dict[str, Any]:
    """Una casa senza niente dentro: è ciò che si trova a installazione nuova."""
    return {
        "rev": 0,
        "casa": {"nome": "Casa", "accento": 210},
        "stanze": [],
        "luci": [],
        "prese": [],
        "ingressi": {"cancelli": [], "porte": []},
        "telecamere": [],
        "scene": [],
        "clima": {"riscaldamento": None, "raffrescamento": []},
        "energia": {},
        "sensori": [],
    }


class ErroreConfigurazione(Exception):
    """La configurazione proposta non è utilizzabile."""


def _lista_di_entita(valore: Any, dove: str) -> list[dict[str, Any]]:
    if not isinstance(valore, list):
        raise ErroreConfigurazione(f"{dove}: atteso un elenco")
    for voce in valore:
        if not isinstance(voce, dict):
            raise ErroreConfigurazione(f"{dove}: ogni voce deve essere un oggetto")
        entity_id = voce.get("entity_id")
        if not isinstance(entity_id, str) or "." not in entity_id:
            raise ErroreConfigurazione(f"{dove}: entity_id mancante o malformato ({entity_id!r})")
    return valore


def valida(config: Any) -> dict[str, Any]:
    """Controlla la forma. Non controlla che le entità esistano: una casa può
    essere configurata prima che un dispositivo venga collegato, e rifiutare
    l'intera configurazione per un entity_id assente sarebbe sproporzionato.
    Le entità mancanti si segnalano nell'interfaccia, una per una."""
    if not isinstance(config, dict):
        raise ErroreConfigurazione("la configurazione deve essere un oggetto")

    pulita = configurazione_vuota()
    pulita["casa"] = {**pulita["casa"], **(config.get("casa") or {})}

    stanze = config.get("stanze") or []
    if not isinstance(stanze, list):
        raise ErroreConfigurazione("stanze: atteso un elenco")
    for stanza in stanze:
        if not isinstance(stanza, dict) or not stanza.get("id"):
            raise ErroreConfigurazione("stanze: ogni stanza deve avere un id")
    pulita["stanze"] = stanze

    for chiave in ("luci", "prese", "telecamere", "scene", "sensori"):
        pulita[chiave] = _lista_di_entita(config.get(chiave) or [], chiave)

    ingressi = config.get("ingressi") or {}
    if not isinstance(ingressi, dict):
        raise ErroreConfigurazione("ingressi: atteso un oggetto")
    pulita["ingressi"] = {
        "cancelli": _lista_di_entita(ingressi.get("cancelli") or [], "ingressi.cancelli"),
        "porte": _lista_di_entita(ingressi.get("porte") or [], "ingressi.porte"),
    }

    clima = config.get("clima") or {}
    if not isinstance(clima, dict):
        raise ErroreConfigurazione("clima: atteso un oggetto")
    riscaldamento = clima.get("riscaldamento")
    if riscaldamento is not None:
        _lista_di_entita([riscaldamento], "clima.riscaldamento")
    pulita["clima"] = {
        "riscaldamento": riscaldamento,
        "raffrescamento": _lista_di_entita(
            clima.get("raffrescamento") or [], "clima.raffrescamento"
        ),
    }

    energia = config.get("energia") or {}
    if not isinstance(energia, dict):
        raise ErroreConfigurazione("energia: atteso un oggetto")
    for nome, entity_id in energia.items():
        if not isinstance(entity_id, str) or "." not in entity_id:
            raise ErroreConfigurazione(f"energia.{nome}: entity_id malformato")
    pulita["energia"] = energia

    return pulita


class ArchivioCasaOS:
    """Custodisce la configurazione e avvisa chi è collegato quando cambia."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store[dict[str, Any]](hass, STORAGE_VERSION, STORAGE_KEY)
        self._dati: dict[str, Any] = configurazione_vuota()
        self._ascoltatori: set[Callable[[dict[str, Any]], None]] = set()

    @property
    def dati(self) -> dict[str, Any]:
        return self._dati

    async def async_carica(self) -> dict[str, Any]:
        salvato = await self._store.async_load()
        self._dati = salvato if salvato else configurazione_vuota()
        return self._dati

    async def async_salva(self, config: dict[str, Any], base_rev: int | None) -> dict[str, Any]:
        """Salva. Se `base_rev` è indicato e non corrisponde, rifiuta.

        Rifiutare è meglio di sovrascrivere: due dispositivi che modificano la
        stessa casa non sono un caso raro quando in famiglia sono in quattro.
        """
        attuale = int(self._dati.get("rev", 0))
        if base_rev is not None and int(base_rev) != attuale:
            raise ErroreConfigurazione(
                f"la configurazione è cambiata nel frattempo (revisione {attuale}, "
                f"tu partivi dalla {base_rev})"
            )

        pulita = valida(config)
        pulita["rev"] = attuale + 1
        self._dati = pulita
        await self._store.async_save(pulita)

        for avvisa in list(self._ascoltatori):
            try:
                avvisa(pulita)
            except Exception:  # noqa: BLE001 — un client rotto non deve fermare gli altri
                _LOGGER.exception("Errore nell'avvisare un client del cambio configurazione")

        return pulita

    @callback
    def aggiungi_ascoltatore(self, avvisa: Callable[[dict[str, Any]], None]) -> Callable[[], None]:
        self._ascoltatori.add(avvisa)

        @callback
        def rimuovi() -> None:
            self._ascoltatori.discard(avvisa)

        return rimuovi
