"""
Orchestrator Agent - Central controller for AI Shop Assistant

Responsibilities:
- Receives frontend requests
- Routes to appropriate agents based on context/intent
- Manages TaskState and execution flow
- Persists audit logs
- Handles retries and failure scenarios
- Returns formatted responses
"""

import uuid
import json
from datetime import datetime
from typing import Optional, Dict, Any
from enum import Enum
from dataclasses import dataclass, asdict

from .inventory_agent import InventoryAgent
from .price_agent import PriceAgent
from .audit_agent import AuditAgent
from .customer_service_agent import CustomerServiceAgent


class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    ESCALATED = "escalated"


@dataclass
class TaskState:
    """Durable task execution state"""
    task_id: str
    user_id: str
    session_id: str
    page: str
    action_type: str
    status: TaskStatus = TaskStatus.PENDING
    inputs: Dict[str, Any] = None
    outputs: Dict[str, Any] = None
    agent_calls: list = None
    created_at: str = None
    updated_at: str = None
    error: Optional[Dict[str, str]] = None

    def __post_init__(self):
        if self.inputs is None:
            self.inputs = {}
        if self.outputs is None:
            self.outputs = {}
        if self.agent_calls is None:
            self.agent_calls = []
        if self.created_at is None:
            self.created_at = datetime.utcnow().isoformat()
        if self.updated_at is None:
            self.updated_at = datetime.utcnow().isoformat()


class OrchestratorAgent:
    """
    Central orchestrator that:
    1. Receives and validates requests
    2. Routes to appropriate agents
    3. Manages execution state
    4. Handles failures and retries
    5. Logs audit trail
    """

    def __init__(self):
        """Initialize all dependent agents"""
        self.inventory_agent = InventoryAgent()
        self.price_agent = PriceAgent()
        self.audit_agent = AuditAgent()
        self.customer_service_agent = CustomerServiceAgent()
        self.task_store: Dict[str, TaskState] = {}  # In production: use persistent DB
        self.audit_log: list = []  # In production: use append-only audit store

    def process_request(
        self,
        user_id: str,
        session_id: str,
        page: str,
        action_type: str,
        ui_payload: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Main entry point for processing frontend requests.
        
        Args:
            user_id: Authenticated user ID
            session_id: Session identifier
            page: Frontend page (Accounting, Analytics, Inventory, etc.)
            action_type: Type of action (query, command, stream, background-job)
            ui_payload: Payload from frontend UI
        
        Returns:
            Response dict with result or job ID
        """
        task_id = str(uuid.uuid4())
        task_state = TaskState(
            task_id=task_id,
            user_id=user_id,
            session_id=session_id,
            page=page,
            action_type=action_type,
            inputs=ui_payload,
        )

        try:
            task_state.status = TaskStatus.IN_PROGRESS
            self._log_audit(task_id, "TASK_STARTED", task_state)

            # Route to appropriate agent(s) based on page context
            if "inventory" in page.lower():
                result = self._handle_inventory_flow(task_state)
            elif "price" in page.lower() or "pricing" in page.lower():
                result = self._handle_price_flow(task_state)
            elif "customer" in page.lower() or "loyalty" in page.lower():
                result = self._handle_customer_service_flow(task_state)
            elif "accounting" in page.lower():
                result = self._handle_audit_flow(task_state)
            else:
                # Default: multi-agent orchestration
                result = self._handle_multi_agent_flow(task_state)

            task_state.outputs = result
            task_state.status = TaskStatus.COMPLETED
            self._log_audit(task_id, "TASK_COMPLETED", task_state)

            self.task_store[task_id] = task_state

            return {
                "success": True,
                "task_id": task_id,
                "data": result,
                "timestamp": datetime.utcnow().isoformat(),
            }

        except Exception as e:
            task_state.status = TaskStatus.FAILED
            task_state.error = {"code": "EXECUTION_ERROR", "message": str(e)}
            self._log_audit(task_id, "TASK_FAILED", task_state)
            self.task_store[task_id] = task_state

            return {
                "success": False,
                "task_id": task_id,
                "error": task_state.error,
                "timestamp": datetime.utcnow().isoformat(),
            }

    def _handle_inventory_flow(self, task_state: TaskState) -> Dict[str, Any]:
        """Route to Inventory Agent"""
        self._log_agent_call(task_state.task_id, "InventoryAgent", task_state.inputs)
        result = self.inventory_agent.process(task_state.inputs)
        self._log_agent_call(task_state.task_id, "InventoryAgent", result, is_output=True)
        return result

    def _handle_price_flow(self, task_state: TaskState) -> Dict[str, Any]:
        """Route to Price Agent"""
        self._log_agent_call(task_state.task_id, "PriceAgent", task_state.inputs)
        result = self.price_agent.process(task_state.inputs)
        self._log_agent_call(task_state.task_id, "PriceAgent", result, is_output=True)
        return result

    def _handle_customer_service_flow(self, task_state: TaskState) -> Dict[str, Any]:
        """Route to Customer Service Agent"""
        self._log_agent_call(
            task_state.task_id, "CustomerServiceAgent", task_state.inputs
        )
        result = self.customer_service_agent.process(task_state.inputs)
        self._log_agent_call(
            task_state.task_id, "CustomerServiceAgent", result, is_output=True
        )
        return result

    def _handle_audit_flow(self, task_state: TaskState) -> Dict[str, Any]:
        """Route to Audit Agent"""
        self._log_agent_call(task_state.task_id, "AuditAgent", task_state.inputs)
        result = self.audit_agent.process(task_state.inputs)
        self._log_agent_call(task_state.task_id, "AuditAgent", result, is_output=True)
        return result

    def _handle_multi_agent_flow(self, task_state: TaskState) -> Dict[str, Any]:
        """Default orchestration: call multiple agents in sequence"""
        results = {}

        # 1. Get customer service insights
        cs_result = self.customer_service_agent.process(task_state.inputs)
        results["customer_service"] = cs_result

        # 2. Fetch inventory context
        inv_result = self.inventory_agent.process({"context": task_state.inputs})
        results["inventory"] = inv_result

        # 3. Calculate pricing recommendations
        price_result = self.price_agent.process(
            {"inventory": inv_result, "context": task_state.inputs}
        )
        results["pricing"] = price_result

        # 4. Log audit trail
        audit_result = self.audit_agent.process(
            {"agents": results, "task_id": task_state.task_id}
        )
        results["audit"] = audit_result

        return results

    def _log_agent_call(
        self, task_id: str, agent_name: str, payload: Dict[str, Any], is_output: bool = False
    ):
        """Log agent invocation"""
        call_type = "OUTPUT" if is_output else "INPUT"
        self.audit_log.append(
            {
                "task_id": task_id,
                "agent": agent_name,
                "call_type": call_type,
                "payload": payload,
                "timestamp": datetime.utcnow().isoformat(),
            }
        )

    def _log_audit(self, task_id: str, event: str, state: TaskState):
        """Log audit event"""
        self.audit_log.append(
            {
                "task_id": task_id,
                "event": event,
                "state": asdict(state),
                "timestamp": datetime.utcnow().isoformat(),
            }
        )

    def get_task_status(self, task_id: str) -> Optional[TaskState]:
        """Retrieve task state"""
        return self.task_store.get(task_id)

    def get_audit_log(self, task_id: str = None) -> list:
        """Retrieve audit log (optionally filtered by task)"""
        if task_id:
            return [log for log in self.audit_log if log.get("task_id") == task_id]
        return self.audit_log
