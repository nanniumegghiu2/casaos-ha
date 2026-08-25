"""Costanti condivise dell'integrazione CasaOS."""

DOMAIN = "casaos"

# Versione: deve combaciare con manifest.json. Usata anche come cache-buster
# sul module_url del pannello, cosi' un aggiornamento non lascia in giro il
# vecchio bundle nella cache del browser del tablet.
VERSION = "0.6.1"

# Percorso HTTP da cui HA serve il bundle del pannello.
PANEL_URL = "/casaos_static"

# Voce nella barra laterale di Home Assistant.
PANEL_TITLE = "CasaOS"
PANEL_ICON = "mdi:home-automation"

# Chiavi in hass.data[DOMAIN]
DATA_STATIC_REGISTERED = "static_registered"

# Storage della configurazione casa (helpers.storage.Store)
STORAGE_VERSION = 1
STORAGE_KEY = "casaos.config"

DATA_ARCHIVIO = "archivio"
DATA_COMANDI_REGISTRATI = "comandi_registrati"
