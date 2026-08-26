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
        "dispositivi": [],
        "ingressi": {"cancelli": [], "porte": []},
        "telecamere": [],
        "scene": [],
        "clima": {"riscaldamento": None, "raffrescamento": []},
        "energia": {},
        "tariffe": None,
        "meteo": None,
        "rifiuti": None,
        "persone": [],
        "scorciatoie": [],
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
        zona = stanza.get("zona", "interno")
        if zona not in ("interno", "esterno"):
            raise ErroreConfigurazione(
                f"stanze.{stanza['id']}: zona deve essere 'interno' o 'esterno'"
            )
        stanza["zona"] = zona
    pulita["stanze"] = stanze

    for chiave in (
        "luci",
        "prese",
        "dispositivi",
        "telecamere",
        "scene",
        "sensori",
        # Dispositivi da tenere sempre sott'occhio in una pastiglia d'angolo.
        "scorciatoie",
    ):
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

    # I prezzi dell'energia, per la stima della bolletta. Sono numeri che solo
    # chi abita la casa conosce: qui si controlla che siano numeri, non che
    # siano giusti.
    tariffe = config.get("tariffe")
    if tariffe is not None:
        if not isinstance(tariffe, dict):
            raise ErroreConfigurazione("tariffe: atteso un oggetto")
        for chiave in ("acquisto", "vendita", "quota_fissa"):
            valore = tariffe.get(chiave)
            if valore is not None and not isinstance(valore, (int, float)):
                raise ErroreConfigurazione(f"tariffe.{chiave}: atteso un numero")
    pulita["tariffe"] = tariffe

    # Chi abita la casa: presenza e batteria del telefono. La foto è opzionale
    # e, se manca, il pannello mostra le iniziali — non un riquadro vuoto.
    persone = config.get("persone") or []
    if not isinstance(persone, list):
        raise ErroreConfigurazione("persone: atteso un elenco")
    for voce in persone:
        if not isinstance(voce, dict):
            raise ErroreConfigurazione("persone: ogni voce deve essere un oggetto")
        presenza = voce.get("presenza")
        if not isinstance(presenza, str) or "." not in presenza:
            raise ErroreConfigurazione(
                f"persone: presenza mancante o malformata ({presenza!r})"
            )
    pulita["persone"] = persone

    # Il calendario della raccolta differenziata. Vive **nella configurazione e
    # non nel codice** perché cambia ogni anno e ogni comune ha il suo: si
    # corregge senza ricompilare niente. Si valida la forma, non il contenuto.
    rifiuti = config.get("rifiuti")
    if rifiuti is not None:
        if not isinstance(rifiuti, dict):
            raise ErroreConfigurazione("rifiuti: atteso un oggetto")
        settimana = rifiuti.get("settimana")
        if not isinstance(settimana, dict):
            raise ErroreConfigurazione("rifiuti.settimana: atteso un oggetto")
        for giorno in settimana:
            if str(giorno) not in {"0", "1", "2", "3", "4", "5", "6"}:
                raise ErroreConfigurazione(
                    f"rifiuti.settimana: {giorno!r} non è un giorno (0=domenica … 6=sabato)"
                )
        eccezioni = rifiuti.get("eccezioni") or {}
        if not isinstance(eccezioni, dict):
            raise ErroreConfigurazione("rifiuti.eccezioni: atteso un oggetto data → tipo")
    pulita["rifiuti"] = rifiuti

    # Una sola entità meteo: quella che l'intestazione mostra a colpo d'occhio.
    meteo = config.get("meteo")
    if meteo is not None and (not isinstance(meteo, str) or "." not in meteo):
        raise ErroreConfigurazione("meteo: entity_id malformato")
    pulita["meteo"] = meteo

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
