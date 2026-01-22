"""
Inventory Agent - Manages stock, SKUs, warehouse operations, and inventory data

Responsibilities:
- Query inventory levels and stock status
- Update stock quantities
- Manage SKU data and product master
- Handle warehouse operations
- Provide inventory forecasts and recommendations
- Track inventory movements
"""

from typing import Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime


@dataclass
class InventoryItem:
    """Inventory item model"""
    sku: str
    product_name: str
    quantity: int
    unit_price: float
    warehouse_location: str
    last_updated: str = None

    def __post_init__(self):
        if self.last_updated is None:
            self.last_updated = datetime.utcnow().isoformat()


class InventoryAgent:
    """
    Manages all inventory-related operations.
    
    Data sources:
    - Inventory DB (PostgreSQL)
    - Warehouse management system
    - POS/Terminal feeds
    - Supplier integration
    """

    def __init__(self):
        """Initialize inventory agent with mock data"""
        self.inventory_db: Dict[str, InventoryItem] = {
            "SKU001": InventoryItem(
                sku="SKU001",
                product_name="Widget Pro",
                quantity=150,
                unit_price=29.99,
                warehouse_location="A-01-01",
            ),
            "SKU002": InventoryItem(
                sku="SKU002",
                product_name="Gadget Lite",
                quantity=45,
                unit_price=19.99,
                warehouse_location="B-02-03",
            ),
            "SKU003": InventoryItem(
                sku="SKU003",
                product_name="Device Max",
                quantity=5,
                unit_price=199.99,
                warehouse_location="C-01-05",
            ),
        }

    def process(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process inventory requests.
        
        Payload may contain:
        - action: "query", "update", "forecast", "reorder"
        - sku: product SKU
        - quantity: for update operations
        - filters: for batch queries
        """
        action = payload.get("action", "query")

        if action == "query":
            return self._query_inventory(payload)
        elif action == "update":
            return self._update_inventory(payload)
        elif action == "forecast":
            return self._forecast_demand(payload)
        elif action == "reorder":
            return self._reorder_check(payload)
        else:
            return {"error": f"Unknown action: {action}"}

    def _query_inventory(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Query inventory levels"""
        sku = payload.get("sku")
        filters = payload.get("filters", {})

        if sku:
            item = self.inventory_db.get(sku)
            if item:
                return {
                    "status": "success",
                    "data": {
                        "sku": item.sku,
                        "product_name": item.product_name,
                        "quantity": item.quantity,
                        "unit_price": item.unit_price,
                        "warehouse_location": item.warehouse_location,
                        "last_updated": item.last_updated,
                    },
                }
            else:
                return {"status": "error", "message": f"SKU {sku} not found"}

        # Return all inventory
        items = []
        for sku_key, item in self.inventory_db.items():
            items.append(
                {
                    "sku": item.sku,
                    "product_name": item.product_name,
                    "quantity": item.quantity,
                    "unit_price": item.unit_price,
                    "warehouse_location": item.warehouse_location,
                }
            )

        return {"status": "success", "data": items, "count": len(items)}

    def _update_inventory(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Update inventory quantity"""
        sku = payload.get("sku")
        quantity = payload.get("quantity")
        operation = payload.get("operation", "set")  # set, add, subtract

        if not sku or quantity is None:
            return {"status": "error", "message": "sku and quantity required"}

        if sku not in self.inventory_db:
            return {"status": "error", "message": f"SKU {sku} not found"}

        item = self.inventory_db[sku]
        old_qty = item.quantity

        if operation == "set":
            item.quantity = quantity
        elif operation == "add":
            item.quantity += quantity
        elif operation == "subtract":
            item.quantity = max(0, item.quantity - quantity)

        item.last_updated = datetime.utcnow().isoformat()

        return {
            "status": "success",
            "data": {
                "sku": sku,
                "old_quantity": old_qty,
                "new_quantity": item.quantity,
                "operation": operation,
                "updated_at": item.last_updated,
            },
        }

    def _forecast_demand(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Forecast inventory demand based on historical patterns"""
        sku = payload.get("sku")
        horizon_days = payload.get("horizon_days", 30)

        if sku and sku in self.inventory_db:
            item = self.inventory_db[sku]
            # Mock forecast: assume simple linear trend
            daily_rate = 2.0  # units per day
            forecasted_qty = max(0, item.quantity - (daily_rate * horizon_days))

            return {
                "status": "success",
                "data": {
                    "sku": sku,
                    "product_name": item.product_name,
                    "current_quantity": item.quantity,
                    "forecast_horizon_days": horizon_days,
                    "estimated_remaining": forecasted_qty,
                    "days_until_stockout": int(item.quantity / daily_rate) if daily_rate > 0 else None,
                },
            }

        return {"status": "error", "message": "SKU not specified or not found"}

    def _reorder_check(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Check which items need reordering"""
        reorder_threshold = payload.get("threshold", 50)
        items_to_reorder = []

        for sku_key, item in self.inventory_db.items():
            if item.quantity < reorder_threshold:
                items_to_reorder.append(
                    {
                        "sku": item.sku,
                        "product_name": item.product_name,
                        "current_quantity": item.quantity,
                        "recommended_order_qty": reorder_threshold * 3,
                    }
                )

        return {
            "status": "success",
            "data": {
                "threshold": reorder_threshold,
                "items_needing_reorder": items_to_reorder,
                "count": len(items_to_reorder),
            },
        }
