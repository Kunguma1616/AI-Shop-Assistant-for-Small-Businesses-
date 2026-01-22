"""Business Analyst Agent scaffold

Produces `TaskDescriptor` from UI payloads and session context.
"""
from typing import Dict, Any

class BusinessAnalyst:
    """Maps UI actions into structured TaskDescriptor objects."""

    def __init__(self, prompt_store: Any, logger: Any):
        self.prompt_store = prompt_store
        self.logger = logger

    def interpret(self, ui_payload: Dict[str, Any], session_context: Dict[str, Any]) -> Dict[str, Any]:
        """Return a TaskDescriptor dict.

        Expected to validate against the TaskDescriptor schema in `schemas/task_models.py`.
        If clarification is needed, return `{ "clarify": True, "questions": [...] }`.
        """
        raise NotImplementedError()
