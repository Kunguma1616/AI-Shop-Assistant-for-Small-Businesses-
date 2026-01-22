# AI Shop Assistant - Backend Architecture

## Overview

This is the backend orchestration layer for the **AI Shop Assistant**, a full-stack AI-driven business application for small businesses. The backend implements a **4-Agent Architecture** that handles all business logic, data operations, and compliance requirements.

## Architecture: 4 Core Agents

```
Frontend (React + TypeScript)
        ↓
   API Gateway
        ↓
  Orchestrator Agent
        ↓
    ┌───┬───┬───┬──────────────┐
    ↓   ↓   ↓   ↓              ↓
  INV PRICE AUD CUST          External APIs
              (Service)
```

### Agent Responsibilities

#### 1. **Inventory Agent** 🏪
- Query and update stock levels
- Manage SKUs and product master data
- Handle warehouse operations
- Forecast demand and reorder points
- Track inventory movements

**Key Operations:**
- `query`: Get inventory levels
- `update`: Adjust stock quantities
- `forecast`: Predict demand
- `reorder`: Check reorder requirements

---

#### 2. **Price Agent** 💰
- Calculate dynamic pricing
- Apply discounts and promotions
- Manage pricing rules and strategies
- Generate pricing recommendations
- Track price history

**Key Operations:**
- `calculate`: Compute final price with discounts
- `apply_discount`: Apply specific pricing rule
- `recommend`: Suggest optimal pricing
- `rules`: List all pricing rules

---

#### 3. **Audit Agent** 📋
- Log all transactions and state changes
- Track user actions and agent decisions
- Maintain immutable audit trails
- Run compliance checks
- Generate compliance reports

**Key Operations:**
- `log`: Record transaction
- `query`: Retrieve audit log
- `compliance_check`: Validate against rules
- `export`: Export audit trail for reporting

---

#### 4. **Customer Service Agent** 👥
- Manage customer profiles and interactions
- Handle support tickets
- Process loyalty programs and rewards
- Generate personalized recommendations
- Track customer sentiment

**Key Operations:**
- `query_customer`: Get customer profile
- `create_ticket`: Log support request
- `get_recommendations`: Generate product recommendations
- `loyalty`: Manage loyalty points

---

## Project Structure

```
backend/
├── main_api.py                 # FastAPI entry point
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
├── README.md                  # This file
│
├── ai_agents/                 # Agent implementations
│   ├── __init__.py
│   ├── orchestrator_agent.py  # Central controller
│   ├── inventory_agent.py     # Stock management
│   ├── price_agent.py         # Pricing logic
│   ├── audit_agent.py         # Compliance & logging
│   └── customer_service_agent.py # Customer operations
│
├── schemas/                   # Data models (Pydantic)
│   ├── __init__.py
│   └── task_models.py        # Request/response schemas
│
├── prompts/                   # LLM prompt templates
│   ├── __init__.py
│   ├── inventory_prompts.py
│   ├── price_prompts.py
│   ├── audit_prompts.py
│   └── customer_service_prompts.py
│
├── utils/                     # Utilities
│   ├── __init__.py
│   ├── logger.py             # Structured logging
│   ├── error_handler.py      # Error handling
│   └── validators.py         # Input validation
│
└── tests/                     # Unit & integration tests
    ├── __init__.py
    ├── test_orchestrator.py
    ├── test_agents.py
    └── test_api.py
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- pip or conda
- PostgreSQL (for production)

### Installation

1. **Clone the repository:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the backend:**
   ```bash
   python main_api.py
   ```

   Or with uvicorn directly:
   ```bash
   uvicorn main_api:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at: **`http://localhost:8000`**

API documentation: **`http://localhost:8000/docs`** (Swagger UI)

---

## API Endpoints

### Core Orchestration

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/query` | Process frontend AI request |
| `GET` | `/api/ai/task/{task_id}` | Get task status |
| `GET` | `/api/ai/audit` | Retrieve audit logs |

### Inventory Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/inventory/query` | Query inventory levels |
| `POST` | `/api/inventory/update` | Update stock quantities |

### Pricing Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/pricing/calculate` | Calculate price with discounts |
| `POST` | `/api/pricing/recommend` | Get pricing recommendations |

### Audit & Compliance

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/audit/compliance-check` | Run compliance validation |

### Customer Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/customer/profile` | Query customer profile |
| `POST` | `/api/customer/support-ticket` | Create support ticket |
| `POST` | `/api/customer/loyalty` | Manage loyalty points |

---

## Request/Response Examples

### Example 1: Process AI Query (Main Endpoint)

**Request:**
```json
POST /api/ai/query
{
  "user_id": "USER123",
  "session_id": "SESSION_XYZ",
  "page": "Inventory",
  "action_type": "query",
  "ui_payload": {
    "action": "query",
    "sku": "SKU001"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "data": {
    "status": "success",
    "data": {
      "sku": "SKU001",
      "product_name": "Widget Pro",
      "quantity": 150,
      "unit_price": 29.99,
      "warehouse_location": "A-01-01"
    }
  },
  "timestamp": "2024-01-22T10:30:00.000Z"
}
```

---

### Example 2: Query Customer Profile

**Request:**
```json
POST /api/customer/profile
{
  "action": "query_customer",
  "customer_id": "CUST001"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "customer_id": "CUST001",
    "name": "John Smith",
    "email": "john@example.com",
    "loyalty_points": 1250,
    "total_purchases": 5000,
    "lifetime_value": 5000,
    "member_since": "2023-01-15T08:00:00"
  }
}
```

---

### Example 3: Calculate Pricing with Discounts

**Request:**
```json
POST /api/pricing/calculate
{
  "action": "calculate",
  "sku": "SKU001",
  "quantity": 10
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "sku": "SKU001",
    "base_price": 29.99,
    "quantity": 10,
    "discount_percent": 10,
    "unit_price_after_discount": 26.99,
    "total_cost": 269.90,
    "savings": 30.00,
    "applicable_rules": ["RULE001"]
  }
}
```

---

## State Management & Audit Trail

Every request flows through the **Orchestrator** which maintains:

1. **TaskState**: Durable task execution state
   - `task_id`: Unique identifier
   - `status`: pending → in_progress → completed/failed
   - `inputs`: Request payload
   - `outputs`: Response payload
   - `agent_calls`: Agent execution trace
   - `created_at`, `updated_at`: Timestamps

2. **AuditRecord**: Immutable audit log entry
   - `task_id`: Task identifier
   - `event`: Type of event (TASK_STARTED, TASK_COMPLETED, TASK_FAILED)
   - `state`: Snapshot of TaskState
   - `timestamp`: When it occurred

**Retrieve audit logs:**
```bash
curl http://localhost:8000/api/ai/audit?task_id=550e8400-e29b-41d4-a716-446655440000
```

---

## Configuration

### Environment Variables (.env)

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ai_shop
AUDIT_DB_URL=postgresql://user:password@localhost:5432/audit_logs

# External Services
OPENAI_API_KEY=sk-...
STRIPE_API_KEY=sk_test_...
INVENTORY_API_URL=https://api.inventory.example.com

# Logging
LOG_LEVEL=INFO
AUDIT_LOG_PATH=./logs/audit.log

# Feature Flags
ENABLE_PRICE_OPTIMIZATION=true
ENABLE_DYNAMIC_PRICING=true
COMPLIANCE_THRESHOLD=50
```

---

## Error Handling

The system categorizes errors into:

1. **Transient Errors** (retry with exponential backoff)
   - Network timeouts
   - Rate limits
   - Temporary service unavailability

2. **Permanent Errors** (escalate immediately)
   - Invalid credentials
   - Data source deprecation
   - Schema mismatches

3. **Semantic Errors** (request clarification)
   - Agent produced invalid output
   - Low-confidence decisions
   - Missing required data

**Error Response Format:**
```json
{
  "success": false,
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "error": {
    "code": "DATA_NOT_FOUND",
    "message": "SKU123 not found in inventory",
    "details": {
      "sku": "SKU123",
      "available_skus": ["SKU001", "SKU002", "SKU003"]
    }
  },
  "timestamp": "2024-01-22T10:30:00.000Z"
}
```

---

## Security Best Practices

1. **Authentication**: JWT tokens with expiration
2. **Authorization**: Role-based access control (RBAC)
3. **Data Protection**:
   - Encrypt sensitive data at rest (AES-256)
   - TLS for all in-transit communication
   - PII redaction in logs
4. **Audit**: Immutable audit logs for all operations
5. **Secrets Management**: Use environment variables or secret manager

---

## Development

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=ai_agents tests/

# Run specific test file
pytest tests/test_agents.py -v
```

### Code Quality

```bash
# Format code
black .

# Lint
flake8 --max-line-length=100

# Type checking (if using mypy)
mypy ai_agents/
```

---

## Deployment

### Docker

```dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main_api:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Build and run:**
```bash
docker build -t ai-shop-backend .
docker run -p 8000:8000 --env-file .env ai-shop-backend
```

### Production Checklist

- [ ] Set `ENV=production` in `.env`
- [ ] Use PostgreSQL (not in-memory storage)
- [ ] Configure proper logging and monitoring
- [ ] Set up SSL/TLS certificates
- [ ] Enable rate limiting and CORS restrictions
- [ ] Configure secrets manager (AWS Secrets Manager, HashiCorp Vault, etc.)
- [ ] Set up health checks and auto-restart
- [ ] Configure CI/CD pipeline for automated deployments

---

## Monitoring & Observability

### Logs

Structured JSON logs are output to:
- Console (development)
- File `/logs/audit.log` (production)

**Log format:**
```json
{
  "timestamp": "2024-01-22T10:30:00.000Z",
  "level": "INFO",
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "USER123",
  "event": "AGENT_CALL",
  "agent": "InventoryAgent",
  "duration_ms": 125,
  "status": "success"
}
```

### Metrics to Monitor

- Request latency (p50, p95, p99)
- Error rates by agent
- Task completion rate
- Audit log volume
- Database query performance

---

## Troubleshooting

### Backend won't start

```bash
# Check Python version
python --version  # Should be 3.10+

# Verify dependencies
pip list | grep fastapi

# Clear cache and reinstall
pip install --force-reinstall -r requirements.txt
```

### Agents returning errors

1. Check logs: `tail -f logs/audit.log`
2. Verify environment variables: `echo $DATABASE_URL`
3. Test agent directly:
   ```python
   from ai_agents import get_orchestrator
   orch = get_orchestrator()
   result = orch.inventory_agent.process({"action": "query", "sku": "SKU001"})
   print(result)
   ```

### Database connection issues

```bash
# Test PostgreSQL connection
psql postgresql://user:password@localhost:5432/ai_shop -c "SELECT 1"

# Check if PostgreSQL is running
ps aux | grep postgres
```

---

## Frontend Integration

### From React (Frontend)

```typescript
// Example: Query inventory
const response = await fetch('http://localhost:8000/api/ai/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: userId,
    session_id: sessionId,
    page: 'Inventory',
    action_type: 'query',
    ui_payload: { action: 'query', sku: 'SKU001' }
  })
});

const result = await response.json();
console.log(result.data);
```

---

## Glossary

- **Orchestrator**: Central controller routing requests to agents
- **TaskState**: Durable execution state of a request
- **AuditRecord**: Immutable log entry
- **Agent**: Specialized service handling specific business domain
- **Task ID**: Unique identifier for request tracking
- **SKU**: Stock Keeping Unit (product identifier)

---

## Support & Contributing

For issues or feature requests, please open a GitHub issue or contact the development team.

---

## License

Proprietary - AI Shop Assistant for Small Businesses

---

**Last Updated:** January 22, 2026  
**Backend Version:** 1.0.0
