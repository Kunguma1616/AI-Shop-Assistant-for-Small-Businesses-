"""Output / UI Response Agent scaffold

Formats `Decision` objects into `UIResponse` payloads suitable for the frontend.
Applies sanitization, localization, and presentation templates.
"""
from typing import Dict, Any

class OutputAgent:
    def __init__(self, template_store: Any, sanitizer: Any, logger: Any):
        self.template_store = template_store
        self.sanitizer = sanitizer
        self.logger = logger

    def format(self, decision: Dict[str, Any], task_descriptor: Dict[str, Any]) -> Dict[str, Any]:
        """Return UIResponse dict according to schema in `schemas/task_models.py`."""
        raise NotImplementedError()
