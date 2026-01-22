"""
Price Agent - Handles pricing strategies, dynamic pricing, and discounts

Responsibilities:
- Calculate dynamic pricing based on demand and inventory
- Apply discounts and promotions
- Manage pricing rules and strategies
- Generate pricing recommendations
- Track price changes and history
"""

from typing import Dict, Any, List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class PricingRule:
    """Pricing rule model"""
    rule_id: str
    name: str
    rule_type: str  # "volume", "dynamic", "promotional", "seasonal"
    condition: Dict[str, Any]
    discount_percent: float
    active: bool


class PriceAgent:
    """
    Manages all pricing-related operations.
    
    Data sources:
    - Price DB
    - Inventory levels (from Inventory Agent)
    - Market data and demand signals
    - Promotion calendar
    """

    def __init__(self):
        """Initialize price agent with mock rules and pricing data"""
        self.pricing_rules: Dict[str, PricingRule] = {
            "RULE001": PricingRule(
                rule_id="RULE001",
                name="Volume Discount",
                rule_type="volume",
                condition={"min_quantity": 10},
                discount_percent=10,
                active=True,
            ),
            "RULE002": PricingRule(
                rule_id="RULE002",
                name="Summer Promotion",
                rule_type="seasonal",
                condition={"months": [6, 7, 8]},
                discount_percent=15,
                active=True,
            ),
        }
        self.base_prices: Dict[str, float] = {
            "SKU001": 29.99,
            "SKU002": 19.99,
            "SKU003": 199.99,
        }
        self.price_history: List[Dict[str, Any]] = []

    def process(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process pricing requests.
        
        Payload may contain:
        - action: "calculate", "apply_discount", "recommend", "rules"
        - sku: product SKU
        - quantity: for volume-based pricing
        - inventory: inventory levels (for dynamic pricing)
        """
        action = payload.get("action", "calculate")

        if action == "calculate":
            return self._calculate_price(payload)
        elif action == "apply_discount":
            return self._apply_discount(payload)
        elif action == "recommend":
            return self._recommend_pricing(payload)
        elif action == "rules":
            return self._get_pricing_rules(payload)
        else:
            return {"error": f"Unknown action: {action}"}

    def _calculate_price(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate price for a product with applicable discounts"""
        sku = payload.get("sku")
        quantity = payload.get("quantity", 1)

        if sku not in self.base_prices:
            return {"status": "error", "message": f"SKU {sku} not found"}

        base_price = self.base_prices[sku]
        total_discount_percent = 0

        # Apply matching rules
        applicable_rules = self._find_applicable_rules(sku, quantity)
        for rule in applicable_rules:
            total_discount_percent = max(total_discount_percent, rule.discount_percent)

        final_price = base_price * (1 - total_discount_percent / 100)
        total_cost = final_price * quantity

        return {
            "status": "success",
            "data": {
                "sku": sku,
                "base_price": base_price,
                "quantity": quantity,
                "discount_percent": total_discount_percent,
                "unit_price_after_discount": final_price,
                "total_cost": total_cost,
                "savings": (base_price - final_price) * quantity,
                "applicable_rules": [rule.rule_id for rule in applicable_rules],
            },
        }

    def _apply_discount(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a specific discount rule"""
        sku = payload.get("sku")
        rule_id = payload.get("rule_id")
        quantity = payload.get("quantity", 1)

        if rule_id not in self.pricing_rules:
            return {"status": "error", "message": f"Rule {rule_id} not found"}

        rule = self.pricing_rules[rule_id]
        if not rule.active:
            return {"status": "error", "message": f"Rule {rule_id} is not active"}

        base_price = self.base_prices.get(sku, 0)
        discounted_price = base_price * (1 - rule.discount_percent / 100)

        return {
            "status": "success",
            "data": {
                "sku": sku,
                "rule_id": rule_id,
                "rule_name": rule.name,
                "base_price": base_price,
                "discount_percent": rule.discount_percent,
                "discounted_price": discounted_price,
                "quantity": quantity,
                "total_cost": discounted_price * quantity,
            },
        }

    def _recommend_pricing(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Generate pricing recommendations"""
        sku = payload.get("sku")
        inventory_levels = payload.get("inventory", {})

        if sku not in self.base_prices:
            return {"status": "error", "message": f"SKU {sku} not found"}

        base_price = self.base_prices[sku]
        current_qty = inventory_levels.get(sku, 0)

        # Dynamic pricing logic: if inventory is low, increase price; if high, decrease
        recommendation = base_price
        rationale = "Normal pricing"

        if current_qty < 10:
            recommendation = base_price * 1.15
            rationale = "Low stock: premium pricing to optimize revenue"
        elif current_qty > 100:
            recommendation = base_price * 0.85
            rationale = "High stock: discounted pricing to move inventory"

        return {
            "status": "success",
            "data": {
                "sku": sku,
                "current_price": base_price,
                "recommended_price": recommendation,
                "price_change_percent": ((recommendation - base_price) / base_price) * 100,
                "current_inventory": current_qty,
                "rationale": rationale,
            },
        }

    def _find_applicable_rules(self, sku: str, quantity: int) -> List[PricingRule]:
        """Find all applicable pricing rules for a product"""
        applicable = []
        current_month = datetime.now().month

        for rule in self.pricing_rules.values():
            if not rule.active:
                continue

            if rule.rule_type == "volume":
                if quantity >= rule.condition.get("min_quantity", 0):
                    applicable.append(rule)
            elif rule.rule_type == "seasonal":
                if current_month in rule.condition.get("months", []):
                    applicable.append(rule)

        return applicable

    def _get_pricing_rules(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Retrieve pricing rules"""
        rules_data = []
        for rule_id, rule in self.pricing_rules.items():
            rules_data.append(
                {
                    "rule_id": rule.rule_id,
                    "name": rule.name,
                    "type": rule.rule_type,
                    "discount_percent": rule.discount_percent,
                    "active": rule.active,
                }
            )

        return {
            "status": "success",
            "data": {
                "rules": rules_data,
                "count": len(rules_data),
                "active_count": sum(1 for r in self.pricing_rules.values() if r.active),
            },
        }
