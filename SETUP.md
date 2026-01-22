# Setup & Deployment Guide

## 📋 Prerequisites

### Local Development
- Git
- Python 3.11+ (backend)
- Node.js 18+ (frontend)
- PostgreSQL 14+ (database)
- Docker & Docker Compose (optional, for containerization)

### Production
- Kubernetes cluster (or Docker Swarm)
- RDS/PostgreSQL managed database
- Secrets manager (AWS Secrets Manager, HashiCorp Vault, or similar)
- LLM provider account (OpenAI, Anthropic, etc.)
- External API credentials (POS, payment gateway, etc.)

---

## 🏠 Local Development Setup

### Step 1: Clone the Repository

```bash
git clone <your-github-repo-url>
cd "AI Shop Assistant for Small Businesses"
```

### Step 2: Set Up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template and fill in values
cp .env.example .env
# Edit .env with your API keys, DB credentials, etc.
```

### Step 3: Set Up Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local if needed
cp .env.example .env.local
```

### Step 4: Start Services

**Terminal 1 — Backend:**
```bash
cd backend
python main_api.py
# Runs on http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

**Terminal 3 (Optional) — Database (if using Docker):**
```bash
docker run --name ai-shop-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=ai_shop \
  -p 5432:5432 \
  -d postgres:15
```

---

## 🐳 Docker Containerization

### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY . .

# Expose port
EXPOSE 8000

# Run API
CMD ["python", "main_api.py"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

### Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ai_shop
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ai_shop
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ai_shop"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://ai_shop:${DB_PASSWORD}@postgres:5432/ai_shop
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      LOG_LEVEL: info
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:8000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app

volumes:
  postgres_data:
```

**Run all services:**
```bash
docker-compose up -d
```

---

## ☁️ Production Deployment (Kubernetes)

### Step 1: Build & Push Images

```bash
# Build backend image
docker build -t your-registry/ai-shop-backend:v1.0.0 ./backend
docker push your-registry/ai-shop-backend:v1.0.0

# Build frontend image
docker build -t your-registry/ai-shop-frontend:v1.0.0 ./frontend
docker push your-registry/ai-shop-frontend:v1.0.0
```

### Step 2: Create Kubernetes Secrets

```bash
# Create namespace
kubectl create namespace ai-shop

# Create database secret
kubectl create secret generic db-credentials \
  --from-literal=username=ai_shop \
  --from-literal=password=<strong-password> \
  -n ai-shop

# Create API keys secret
kubectl create secret generic api-keys \
  --from-literal=openai_key=<your-key> \
  --from-literal=anthropic_key=<your-key> \
  -n ai-shop
```

### Step 3: Deploy with Helm or Kubectl

Create `k8s/backend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-shop-backend
  namespace: ai-shop
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-shop-backend
  template:
    metadata:
      labels:
        app: ai-shop-backend
    spec:
      containers:
      - name: backend
        image: your-registry/ai-shop-backend:v1.0.0
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: database_url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: openai_key
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 5
        resources:
          requests:
            cpu: 500m
            memory: 512Mi
          limits:
            cpu: 1000m
            memory: 1Gi

---
apiVersion: v1
kind: Service
metadata:
  name: ai-shop-backend
  namespace: ai-shop
spec:
  selector:
    app: ai-shop-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer
```

Deploy:
```bash
kubectl apply -f k8s/backend-deployment.yaml
```

---

## 🔐 Secrets Management

### Using AWS Secrets Manager

```python
# In backend/main_api.py
import boto3

secrets_client = boto3.client('secretsmanager', region_name='us-east-1')

def get_secret(secret_name):
    try:
        response = secrets_client.get_secret_value(SecretId=secret_name)
        return json.loads(response['SecretString'])
    except Exception as e:
        print(f"Error retrieving secret: {e}")
        return None

# Usage
db_creds = get_secret('ai-shop/db')
DATABASE_URL = f"postgresql://{db_creds['username']}:{db_creds['password']}@{db_creds['host']}:5432/ai_shop"
```

### Using HashiCorp Vault

```python
import hvac

vault_client = hvac.Client(url='https://vault.example.com', token=os.environ['VAULT_TOKEN'])

db_creds = vault_client.secrets.kv.v2.read_secret_version(path='ai-shop/db')
```

---

## 🗄️ Database Migrations

### Using Alembic

```bash
cd backend
alembic init migrations
```

Create migration:
```bash
alembic revision --autogenerate -m "Initial schema"
```

Apply migrations:
```bash
alembic upgrade head
```

---

## 📊 Observability Setup

### Prometheus + Grafana

Add to `backend/main_api.py`:

```python
from prometheus_client import Counter, Histogram
from prometheus_fastapi_instrumentator import Instrumentator

# Metrics
request_count = Counter(
    'api_requests_total',
    'Total API requests',
    ['method', 'endpoint', 'status']
)

request_latency = Histogram(
    'api_request_duration_seconds',
    'API request latency',
    ['method', 'endpoint']
)

# Setup instrumentation
Instrumentator().instrument(app).expose(app)
```

### Structured Logging

```python
import logging
import json

logging.basicConfig(
    level=logging.INFO,
    format='%(message)s'
)

logger = logging.getLogger(__name__)

def log_event(task_id, event_type, data):
    logger.info(json.dumps({
        'timestamp': datetime.utcnow().isoformat(),
        'task_id': task_id,
        'event_type': event_type,
        'data': data
    }))
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build backend image
        run: docker build -t backend:${{ github.sha }} ./backend

      - name: Build frontend image
        run: docker build -t frontend:${{ github.sha }} ./frontend

      - name: Push to registry
        run: |
          docker push your-registry/ai-shop-backend:${{ github.sha }}
          docker push your-registry/ai-shop-frontend:${{ github.sha }}

      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/ai-shop-backend \
            ai-shop-backend=your-registry/ai-shop-backend:${{ github.sha }} \
            -n ai-shop
          kubectl set image deployment/ai-shop-frontend \
            ai-shop-frontend=your-registry/ai-shop-frontend:${{ github.sha }} \
            -n ai-shop
```

---

## ✅ Health Checks & Monitoring

### Liveness & Readiness Probes

```bash
# Backend health
curl http://localhost:8000/health

# Frontend (built with Vite)
curl http://localhost:5173/
```

### Database Health

```bash
psql -h localhost -U ai_shop -d ai_shop -c "SELECT 1"
```

---

## 🆘 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.11+)
- Check `.env` file is created and has required keys
- Check port 8000 is not in use: `netstat -tuln | grep 8000`
- Check database connection: `psql -h localhost -U ai_shop`

### Frontend build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (need 18+)

### API returns 401
- Check JWT token in Authorization header
- Check token not expired

---

## 📞 Support & Documentation

- Backend docs: `backend/README.md`
- Frontend docs: `frontend/README.md`
- Issue tracker: GitHub Issues
