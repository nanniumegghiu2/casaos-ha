"""Config flow di CasaOS.

Per ora non chiede nulla: l'installazione e' una conferma. La configurazione
della casa (entita', stanze, telecamere, fasce del clima) vivra' nello storage
dell'integrazione e si modifichera' dal pannello, non da qui.
"""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN, PANEL_TITLE


class CasaOSConfigFlow(ConfigFlow, domain=DOMAIN):
    """Installazione guidata di CasaOS."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Unico passo: conferma. Una sola istanza per installazione HA."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title=PANEL_TITLE, data={})

        return self.async_show_form(step_id="user")
