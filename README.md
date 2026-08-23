# CasaOS

Pannello domotico integrato in **Home Assistant**. Non è una dashboard Lovelace e non
è un add-on: è una *custom integration* che registra un pannello React nella barra
laterale, con accesso diretto all'oggetto `hass`.

Conseguenza pratica: niente token da configurare, niente proxy, niente login
separato. Chi è autenticato in Home Assistant è autenticato in CasaOS, con i propri
permessi.

## Cosa mostra

- **Fotovoltaico** — scena con i flussi luminosi che si muovono verso la loro
  destinazione reale (casa, batteria, rete), più produzione, consumo e
  autosufficienza della giornata.
- **Telecamere** — tutte le camere di casa a colpo d'occhio, un tocco per la diretta.
  Il flusso scende per gradini: WebRTC, poi HLS, poi fotogrammi, così una camera si
  vede anche quando la rete non regge il WebRTC.
- **Illuminazione** — luci per stanza, con l'accensione che si vede.
- **Ingressi** — cancelli, con conferma prima di muoverli e un avviso a schermo
  mentre si aprono.

È pensato per un **tablet a muro in orizzontale**: le schede si adattano allo
schermo e non si scorre mai. Su telefono la stessa interfaccia si riorganizza in una
colonna.

## Requisiti

- Home Assistant **2025.12** o successivo
- Nessuna dipendenza Python, nessun servizio esterno

## Installazione con HACS

1. In HACS → menu in alto a destra → **Repository personalizzati**
2. Aggiungi `https://github.com/nanniumegghiu2/casaos-ha`, categoria **Integration**
3. Cerca **CasaOS**, scaricalo
4. **Riavvia** Home Assistant
5. Impostazioni → Dispositivi e servizi → **Aggiungi integrazione** → CasaOS

CasaOS compare nella barra laterale. Gli aggiornamenti arrivano da HACS come per
qualsiasi altra integrazione.

## Installazione manuale

Copia la cartella `custom_components/casaos` dentro la cartella `config` di Home
Assistant, riavvia, poi aggiungi l'integrazione.

## Configurazione

Quali luci, quali telecamere, quali sensori del fotovoltaico: la configurazione vive
**dentro Home Assistant** (non nel browser), quindi è la stessa sul tablet e sul
telefono, e sopravvive alla pulizia della cache. Si modifica dal pannello.

## Licenza

MIT — vedi [LICENSE](LICENSE).
