"""
AI Agents Module - 4-Agent Architecture for AI Shop Assistant

Agents:
1. Inventory Agent: Manages stock, SKUs, warehouse operations
2. Price Agent: Handles pricing strategies, dynamic pricing, discounts
3. Audit Agent: Tracks all business transactions, compliance, audit logs
4. Customer Service Agent: Handles customer interactions, support, loyalty
"""

from .orchestrator_agent import OrchestratorAgent
from .inventory_agent import InventoryAgent
from .price_agent import PriceAgent
from .audit_agent import AuditAgent
from .customer_service_agent import CustomerServiceAgent

__all__ = [
    "OrchestratorAgent",
    "InventoryAgent",
    "PriceAgent",
    "AuditAgent",
    "CustomerServiceAgent",
]

# Initialize global orchestrator (singleton)
_orchestrator = None


def get_orchestrator():
    """Get or create the global orchestrator instance"""
    global _orchestrator
    if _orchestrator is None:
        _orchestrator = OrchestratorAgent()
    return _orchestrator
