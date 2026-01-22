"""
Audit Agent - Tracks all business transactions, compliance, and audit logs

Responsibilities:
- Record all transactions and state changes
- Track user actions and agent decisions
- Generate compliance reports
- Maintain immutable audit trails
- Support forensic analysis and reconstruction
"""

from typing import Dict, Any, List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class AuditEntry:
    """Audit log entry model"""
    entry_id: str
    task_id: str
    user_id: str
    action: str  # CREATE, UPDATE, DELETE, QUERY, DECISION
    entity_type: str  # Order, Product, Price, Customer, etc.
    entity_id: str
    before_state: Dict[str, Any]
    after_state: Dict[str, Any]
    reason: str
    timestamp: str
    agent_name: str
    status: str  # SUCCESS, FAILED


class AuditAgent:
    """
    Maintains audit trail and compliance logging.
    
    Data sources:
    - Orchestrator task events
    - Agent decisions
    - Database transactions
    - User actions
    """

    def __init__(self):
        """Initialize audit agent"""
        self.audit_entries: List[AuditEntry] = []
        self.compliance_configs = {
            "max_price_change_percent": 50,  # Flag prices changing >50%
            "require_approval_over_amount": 1000,  # Flag transactions >$1000
            "data_retention_days": 2555,  # ~7 years for compliance
        }

    def process(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process audit requests.
        
        Payload may contain:
        - action: "log", "query", "compliance_check", "export"
        - task_id: associated task
        - transaction: transaction details
        """
        action = payload.get("action", "log")

        if action == "log":
            return self._log_transaction(payload)
        elif action == "query":
            return self._query_audit_log(payload)
        elif action == "compliance_check":
            return self._compliance_check(payload)
        elif action == "export":
            return self._export_audit_trail(payload)
        else:
            return {"error": f"Unknown action: {action}"}

    def _log_transaction(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Log a transaction or state change"""
        task_id = payload.get("task_id", "N/A")
        user_id = payload.get("user_id", "system")
        action = payload.get("transaction_action", "UNKNOWN")
        entity_type = payload.get("entity_type", "Unknown")
        entity_id = payload.get("entity_id", "N/A")
        before_state = payload.get("before_state", {})
        after_state = payload.get("after_state", {})
        reason = payload.get("reason", "No reason provided")
        agent_name = payload.get("agent_name", "Unknown")

        entry_id = f"AUDIT_{len(self.audit_entries) + 1:06d}"
        timestamp = datetime.utcnow().isoformat()

        # Run compliance checks
        compliance_flags = self._run_compliance_checks(
            action, before_state, after_state, payload.get("amount")
        )

        audit_entry = AuditEntry(
            entry_id=entry_id,
            task_id=task_id,
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            before_state=before_state,
            after_state=after_state,
            reason=reason,
            timestamp=timestamp,
            agent_name=agent_name,
            status="SUCCESS",
        )

        self.audit_entries.append(audit_entry)

        return {
            "status": "success",
            "data": {
                "entry_id": entry_id,
                "logged_at": timestamp,
                "compliance_flags": compliance_flags,
                "requires_review": len(compliance_flags) > 0,
            },
        }

    def _query_audit_log(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Query audit log with filters"""
        task_id = payload.get("task_id")
        user_id = payload.get("user_id")
        entity_type = payload.get("entity_type")
        action = payload.get("action")
        limit = payload.get("limit", 100)

        filtered = self.audit_entries

        if task_id:
            filtered = [e for e in filtered if e.task_id == task_id]
        if user_id:
            filtered = [e for e in filtered if e.user_id == user_id]
        if entity_type:
            filtered = [e for e in filtered if e.entity_type == entity_type]
        if action:
            filtered = [e for e in filtered if e.action == action]

        # Return most recent entries first
        filtered = sorted(filtered, key=lambda x: x.timestamp, reverse=True)[:limit]

        entries_data = [
            {
                "entry_id": e.entry_id,
                "task_id": e.task_id,
                "user_id": e.user_id,
                "action": e.action,
                "entity_type": e.entity_type,
                "entity_id": e.entity_id,
                "timestamp": e.timestamp,
                "agent_name": e.agent_name,
            }
            for e in filtered
        ]

        return {
            "status": "success",
            "data": {
                "entries": entries_data,
                "count": len(entries_data),
                "filters_applied": {
                    "task_id": task_id,
                    "user_id": user_id,
                    "entity_type": entity_type,
                    "action": action,
                },
            },
        }

    def _compliance_check(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Perform compliance checks on a transaction"""
        transaction_action = payload.get("action", "")
        before_state = payload.get("before_state", {})
        after_state = payload.get("after_state", {})
        amount = payload.get("amount", 0)

        flags = self._run_compliance_checks(
            transaction_action, before_state, after_state, amount
        )

        return {
            "status": "success",
            "data": {
                "compliant": len(flags) == 0,
                "flags": flags,
                "requires_approval": len(flags) > 0,
            },
        }

    def _export_audit_trail(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Export audit trail for compliance reporting"""
        format_type = payload.get("format", "json")  # json, csv
        start_date = payload.get("start_date")
        end_date = payload.get("end_date")

        filtered = self.audit_entries

        # Filter by date range if provided
        if start_date:
            filtered = [e for e in filtered if e.timestamp >= start_date]
        if end_date:
            filtered = [e for e in filtered if e.timestamp <= end_date]

        # Group by user for summary
        user_actions = {}
        for entry in filtered:
            if entry.user_id not in user_actions:
                user_actions[entry.user_id] = {
                    "total_actions": 0,
                    "actions_by_type": {},
                }
            user_actions[entry.user_id]["total_actions"] += 1
            action_type = entry.action
            user_actions[entry.user_id]["actions_by_type"][action_type] = (
                user_actions[entry.user_id]["actions_by_type"].get(action_type, 0) + 1
            )

        return {
            "status": "success",
            "data": {
                "total_entries": len(filtered),
                "date_range": {"start": start_date, "end": end_date},
                "format": format_type,
                "user_summary": user_actions,
                "export_timestamp": datetime.utcnow().isoformat(),
            },
        }

    def _run_compliance_checks(
        self, action: str, before_state: Dict, after_state: Dict, amount: Any = None
    ) -> List[str]:
        """Run compliance validation rules"""
        flags = []

        # Check for price anomalies
        if action == "UPDATE" and "price" in before_state and "price" in after_state:
            old_price = float(before_state.get("price", 0))
            new_price = float(after_state.get("price", 0))
            if old_price > 0:
                change_percent = abs((new_price - old_price) / old_price * 100)
                if change_percent > self.compliance_configs["max_price_change_percent"]:
                    flags.append(
                        f"PRICE_ANOMALY: {change_percent:.1f}% change (max allowed: {self.compliance_configs['max_price_change_percent']}%)"
                    )

        # Check for large transaction amounts
        if amount and amount > self.compliance_configs["require_approval_over_amount"]:
            flags.append(
                f"HIGH_AMOUNT: ${amount:,.2f} exceeds approval threshold of ${self.compliance_configs['require_approval_over_amount']:,.2f}"
            )

        # Check for suspicious delete operations
        if action == "DELETE":
            flags.append("DELETE_OPERATION: All delete operations flagged for manual review")

        return flags
