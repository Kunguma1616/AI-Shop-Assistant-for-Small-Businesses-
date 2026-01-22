"""
Customer Service Agent - Handles customer interactions, support, and loyalty

Responsibilities:
- Process customer inquiries and support requests
- Manage loyalty programs and rewards
- Track customer interactions and preferences
- Generate personalized recommendations
- Handle complaint resolution
"""

from typing import Dict, Any, List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class Customer:
    """Customer profile model"""
    customer_id: str
    name: str
    email: str
    phone: str
    loyalty_points: float
    total_purchases: float
    lifetime_value: float
    preferences: Dict[str, Any]
    created_at: str


@dataclass
class Interaction:
    """Customer interaction record"""
    interaction_id: str
    customer_id: str
    interaction_type: str  # chat, email, phone, in_person
    subject: str
    message: str
    resolution: str
    sentiment: str  # positive, neutral, negative
    timestamp: str


class CustomerServiceAgent:
    """
    Manages all customer service operations.
    
    Data sources:
    - Customer DB
    - Interaction history
    - Loyalty program DB
    - Support tickets
    """

    def __init__(self):
        """Initialize customer service agent with mock data"""
        self.customers: Dict[str, Customer] = {
            "CUST001": Customer(
                customer_id="CUST001",
                name="John Smith",
                email="john@example.com",
                phone="555-0001",
                loyalty_points=1250.0,
                total_purchases=5000.0,
                lifetime_value=5000.0,
                preferences={"newsletter": True, "sms_alerts": False},
                created_at=datetime.utcnow().isoformat(),
            ),
            "CUST002": Customer(
                customer_id="CUST002",
                name="Jane Doe",
                email="jane@example.com",
                phone="555-0002",
                loyalty_points=3450.0,
                total_purchases=12500.0,
                lifetime_value=12500.0,
                preferences={"newsletter": True, "sms_alerts": True},
                created_at=datetime.utcnow().isoformat(),
            ),
        }
        self.interactions: List[Interaction] = []

    def process(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process customer service requests.
        
        Payload may contain:
        - action: "query_customer", "create_ticket", "get_recommendations", "loyalty"
        - customer_id: customer identifier
        - message: customer inquiry
        """
        action = payload.get("action", "query_customer")

        if action == "query_customer":
            return self._query_customer(payload)
        elif action == "create_ticket":
            return self._create_support_ticket(payload)
        elif action == "get_recommendations":
            return self._get_recommendations(payload)
        elif action == "loyalty":
            return self._manage_loyalty(payload)
        else:
            return {"error": f"Unknown action: {action}"}

    def _query_customer(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Query customer profile"""
        customer_id = payload.get("customer_id")
        email = payload.get("email")

        customer = None
        if customer_id:
            customer = self.customers.get(customer_id)
        elif email:
            for cust in self.customers.values():
                if cust.email == email:
                    customer = cust
                    break

        if not customer:
            return {"status": "error", "message": "Customer not found"}

        return {
            "status": "success",
            "data": {
                "customer_id": customer.customer_id,
                "name": customer.name,
                "email": customer.email,
                "phone": customer.phone,
                "loyalty_points": customer.loyalty_points,
                "total_purchases": customer.total_purchases,
                "lifetime_value": customer.lifetime_value,
                "member_since": customer.created_at,
                "preferences": customer.preferences,
            },
        }

    def _create_support_ticket(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Create a customer support ticket"""
        customer_id = payload.get("customer_id")
        interaction_type = payload.get("interaction_type", "chat")
        subject = payload.get("subject")
        message = payload.get("message")

        if customer_id not in self.customers:
            return {"status": "error", "message": f"Customer {customer_id} not found"}

        if not subject or not message:
            return {"status": "error", "message": "subject and message required"}

        interaction_id = f"TICKET_{len(self.interactions) + 1:06d}"
        timestamp = datetime.utcnow().isoformat()

        # Simple sentiment analysis (mock)
        sentiment = self._analyze_sentiment(message)

        interaction = Interaction(
            interaction_id=interaction_id,
            customer_id=customer_id,
            interaction_type=interaction_type,
            subject=subject,
            message=message,
            resolution="",
            sentiment=sentiment,
            timestamp=timestamp,
        )

        self.interactions.append(interaction)

        # Generate auto-response based on sentiment
        auto_response = self._generate_response(sentiment, subject)

        return {
            "status": "success",
            "data": {
                "ticket_id": interaction_id,
                "customer_id": customer_id,
                "created_at": timestamp,
                "sentiment": sentiment,
                "auto_response": auto_response,
                "requires_escalation": sentiment == "negative",
            },
        }

    def _get_recommendations(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized product recommendations"""
        customer_id = payload.get("customer_id")

        if customer_id not in self.customers:
            return {"status": "error", "message": f"Customer {customer_id} not found"}

        customer = self.customers[customer_id]

        # Mock recommendations based on customer tier
        recommendations = []
        if customer.lifetime_value > 10000:
            recommendations = [
                {
                    "sku": "SKU001",
                    "product": "Widget Pro",
                    "reason": "Premium tier customer preference",
                    "discount": 15,
                }
            ]
        else:
            recommendations = [
                {"sku": "SKU002", "product": "Gadget Lite", "reason": "Popular entry-level product", "discount": 10}
            ]

        return {
            "status": "success",
            "data": {
                "customer_id": customer_id,
                "customer_tier": self._get_customer_tier(customer.lifetime_value),
                "recommendations": recommendations,
                "personalization_score": 0.85,
            },
        }

    def _manage_loyalty(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Manage loyalty points"""
        customer_id = payload.get("customer_id")
        operation = payload.get("operation", "check")  # check, add, redeem
        points = payload.get("points", 0)

        if customer_id not in self.customers:
            return {"status": "error", "message": f"Customer {customer_id} not found"}

        customer = self.customers[customer_id]

        if operation == "check":
            return {
                "status": "success",
                "data": {
                    "customer_id": customer_id,
                    "loyalty_points": customer.loyalty_points,
                    "tier": self._get_customer_tier(customer.lifetime_value),
                    "points_to_next_tier": self._points_to_next_tier(
                        customer.lifetime_value
                    ),
                },
            }

        elif operation == "add":
            customer.loyalty_points += points
            return {
                "status": "success",
                "data": {
                    "customer_id": customer_id,
                    "points_added": points,
                    "total_loyalty_points": customer.loyalty_points,
                    "updated_at": datetime.utcnow().isoformat(),
                },
            }

        elif operation == "redeem":
            if customer.loyalty_points < points:
                return {
                    "status": "error",
                    "message": f"Insufficient points. Available: {customer.loyalty_points}",
                }
            customer.loyalty_points -= points
            return {
                "status": "success",
                "data": {
                    "customer_id": customer_id,
                    "points_redeemed": points,
                    "remaining_points": customer.loyalty_points,
                    "reward_value": points * 0.01,  # $0.01 per point
                },
            }

    def _analyze_sentiment(self, message: str) -> str:
        """Simple sentiment analysis"""
        negative_words = ["bad", "terrible", "awful", "horrible", "problem", "issue", "broken"]
        positive_words = ["great", "excellent", "amazing", "love", "perfect"]

        message_lower = message.lower()
        neg_count = sum(1 for word in negative_words if word in message_lower)
        pos_count = sum(1 for word in positive_words if word in message_lower)

        if neg_count > pos_count:
            return "negative"
        elif pos_count > neg_count:
            return "positive"
        else:
            return "neutral"

    def _generate_response(self, sentiment: str, subject: str) -> str:
        """Generate auto-response"""
        if sentiment == "negative":
            return f"We sincerely apologize for the issue with your {subject}. Our support team will prioritize your ticket for immediate resolution."
        elif sentiment == "positive":
            return f"Thank you for your positive feedback on {subject}! We're thrilled you're satisfied with your experience."
        else:
            return f"Thank you for reaching out about {subject}. We're here to help and will respond shortly."

    def _get_customer_tier(self, lifetime_value: float) -> str:
        """Determine customer tier"""
        if lifetime_value > 10000:
            return "Platinum"
        elif lifetime_value > 5000:
            return "Gold"
        else:
            return "Silver"

    def _points_to_next_tier(self, lifetime_value: float) -> float:
        """Calculate points needed to reach next tier"""
        if lifetime_value < 5000:
            return 5000 - lifetime_value
        elif lifetime_value < 10000:
            return 10000 - lifetime_value
        else:
            return 0
