# AI Shop Assistant for Small Businesses

A full-stack AI-driven business application featuring **4 specialized AI agents** for inventory management, pricing optimization, customer service, and audit logging.

## 🏗️ Project Structure

```
├── frontend/                    # React + TypeScript SPA
│   ├── src/
│   │   ├── components/         # UI components (POS, Dashboard, etc)
│   │   ├── pages/              # Frontend pages
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Python orchestration layer + agents
│   ├── ai_agents/              # 4 AI agents
│   │   ├── orchestrator.py      # Central orchestrator
│   │   ├── inventory_agent.py   # Inventory management
│   │   ├── price_agent.py       # Pricing optimization
│   │   ├── customer_service_agent.py  # Customer support
│   │   ├── audit_agent.py       # Compliance & auditing
│   │   └── ...
│   ├── schemas/                # Pydantic models (request/response types)
│   ├── prompts/                # Prompt templates for agents
│   ├── main_api.py             # FastAPI entrypoint
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template
│   └── README.md               # Backend docs
│
├── .gitignore
├── README.md                   # This file
└── SETUP.md                    # Deployment & setup guide
```

## 🚀 Quick Start

### Prerequisites
- **Frontend:** Node.js 18+, npm/yarn
- **Backend:** Python 3.11+, pip

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd "AI Shop Assistant for Small Businesses"

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Backend: Copy .env.example to .env and fill in your keys
cp backend/.env.example backend/.env

# Edit backend/.env with:
# - LLM provider keys (OpenAI, Anthropic, etc)
# - Database credentials
# - External API keys (POS, payment gateway, etc)
```

### 3. Run Development

```bash
# Terminal 1: Frontend (from project root)
cd frontend && npm run dev

# Terminal 2: Backend (from project root)
cd backend && python main_api.py
```

Frontend: `http://localhost:5173`
Backend API: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

## 📋 AI Agents

### 1. **Orchestrator Agent** (`orchestrator.py`)
- Central controller that sequences agent calls
- Manages state and task execution
- Enforces deterministic workflows
- Routes requests to specialized agents

### 2. **Inventory Agent** (`inventory_agent.py`)
- Manages stock levels, SKUs, and warehouse inventory
- Tracks product availability
- Triggers reorder alerts
- Syncs with POS and inventory systems

### 3. **Price Agent** (`price_agent.py`)
- Optimizes pricing strategies
- Applies dynamic pricing rules
- Calculates discounts and promotions
- Suggests competitive pricing

### 4. **Customer Service Agent** (`customer_service_agent.py`)
- Handles customer inquiries and support tickets
- Routes to specialized agents or humans
- Maintains conversation context
- Ensures safe, on-brand responses

### 5. **Audit Agent** (`audit_agent.py`)
- Logs all agent actions and decisions
- Ensures compliance with regulations
- Maintains audit trail for financial actions
- Generates audit reports

## 🔌 Frontend Pages & Integrations

- **Accounting:** Ledger, reconciliation, expense categorization (uses Inventory, Price, Audit agents)
- **Analytics:** KPIs, trends, forecasting (uses Inventory, Price agents)
- **Customer Service:** Chat, tickets, CRM (uses Customer Service agent)
- **Inventory:** Stock management, warehouses (uses Inventory agent)
- **Loyalty:** Points, promotions, rewards (uses Price agent)
- **POS:** Point-of-sale, checkout (uses Inventory, Price agents)
- **Pricing:** Dynamic pricing, promotions (uses Price agent)
- **Settings:** Admin config, integrations (uses Audit agent)
- **Social Media:** Content generation, scheduling (uses Customer Service agent)

## 📡 API Endpoints

All endpoints are under `/api/ai/`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ai/query` | POST | Synchronous agent query |
| `/api/ai/stream` | POST | Stream agent responses (SSE) |
| `/api/ai/task/{taskId}` | GET | Poll task status |
| `/api/ai/audit-log` | GET | Retrieve audit logs |
| `/api/ai/health` | GET | Health check |

## 🔐 Security

- **Auth:** OIDC/JWT with RBAC
- **Secrets:** Environment variables + secrets manager
- **Data:** AES-256 encryption at rest, TLS in transit
- **Audit:** Immutable append-only logs
- **Guardrails:** Schema validation, content filtering, PII redaction

## 📊 Observability

- **Logs:** Structured JSON logging with `taskId` correlation
- **Traces:** Distributed tracing across agents
- **Metrics:** Request latency, error rates, agent confidence scores
- **Dashboards:** OpenTelemetry + Prometheus + Grafana
- **Audit Store:** Immutable records of all agent prompts and outputs

## 🛠️ Development

### Running Backend Tests
```bash
cd backend
pytest tests/
```

### Running Backend Linter
```bash
cd backend
pylint ai_agents/ --rcfile=.pylintrc
```

### Frontend Hot Reload
```bash
cd frontend
npm run dev
```

## 📝 Documentation

- [Backend Docs](backend/README.md) — Architecture, schemas, prompts, SOPs
- [Setup Guide](SETUP.md) — Deployment, scaling, production config

## 🚢 Deployment

See [SETUP.md](SETUP.md) for:
- Docker containerization
- Kubernetes deployment
- CI/CD pipeline setup
- Database migration
- Secret management in production

## 🤝 Contributing

1. Create a feature branch
2. Follow the code style (Black for Python, Prettier for JS)
3. Add tests and update docs
4. Submit a pull request

## 📄 License

[Your license here]

## ❓ Support

For issues, feature requests, or documentation questions:
- Open an issue on GitHub
- Check existing documentation in [Backend Docs](backend/README.md)
