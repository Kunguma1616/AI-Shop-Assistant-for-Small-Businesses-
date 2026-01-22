"""
FastAPI Main Application - AI Shop Assistant Backend

Endpoints:
- POST /api/ai/query - Process frontend requests
- GET /api/ai/task/{task_id} - Retrieve task status
- GET /api/ai/audit - Get audit logs
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import json

from ai_agents import get_orchestrator

# Initialize FastAPI app
app = FastAPI(
    title="AI Shop Assistant Backend",
    description="Backend orchestration layer with 4 AI agents",
    version="1.0.0",
)

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: specify exact frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class AIQueryRequest(BaseModel):
    """Request model for AI query endpoint"""
    user_id: str
    session_id: str
    page: str
    action_type: str = "query"  # query, command, stream, background-job
    ui_payload: Dict[str, Any]


class AIQueryResponse(BaseModel):
    """Response model for AI query endpoint"""
    success: bool
    task_id: str
    data: Optional[Dict[str, Any]] = None
    error: Optional[Dict[str, str]] = None
    timestamp: str


class TaskStatusResponse(BaseModel):
    """Response model for task status"""
    task_id: str
    status: str
    inputs: Dict[str, Any]
    outputs: Optional[Dict[str, Any]]
    error: Optional[Dict[str, str]]
    created_at: str
    updated_at: str


# Dependency
def get_orchestrator_instance():
    """Dependency to get orchestrator singleton"""
    return get_orchestrator()


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "AI Shop Assistant Backend"}


# Main AI query endpoint
@app.post("/api/ai/query", response_model=AIQueryResponse)
async def process_ai_query(
    request: AIQueryRequest,
    orchestrator=Depends(get_orchestrator_instance),
):
    """
    Main endpoint for processing frontend AI requests.
    
    Routes to appropriate agents based on page and action context.
    """
    try:
        result = orchestrator.process_request(
            user_id=request.user_id,
            session_id=request.session_id,
            page=request.page,
            action_type=request.action_type,
            ui_payload=request.ui_payload,
        )
        return AIQueryResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Task status endpoint
@app.get("/api/ai/task/{task_id}", response_model=TaskStatusResponse)
async def get_task_status(
    task_id: str,
    orchestrator=Depends(get_orchestrator_instance),
):
    """Retrieve status of a specific task"""
    task_state = orchestrator.get_task_status(task_id)
    if not task_state:
        raise HTTPException(status_code=404, detail=f"Task {task_id} not found")

    return TaskStatusResponse(
        task_id=task_state.task_id,
        status=task_state.status.value,
        inputs=task_state.inputs,
        outputs=task_state.outputs,
        error=task_state.error,
        created_at=task_state.created_at,
        updated_at=task_state.updated_at,
    )


# Audit log endpoint
@app.get("/api/ai/audit")
async def get_audit_logs(
    task_id: Optional[str] = None,
    user_id: Optional[str] = None,
    orchestrator=Depends(get_orchestrator_instance),
):
    """Retrieve audit logs (optionally filtered by task_id or user_id)"""
    logs = orchestrator.get_audit_log(task_id=task_id)

    # Filter by user_id if provided
    if user_id:
        logs = [log for log in logs if log.get("state", {}).get("user_id") == user_id]

    return {
        "total_entries": len(logs),
        "filters": {"task_id": task_id, "user_id": user_id},
        "logs": logs[-100:],  # Return latest 100 entries
    }


# Inventory endpoints (proxy to Inventory Agent)
@app.post("/api/inventory/query")
async def inventory_query(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Query inventory data"""
    result = orchestrator.inventory_agent.process(payload)
    return result


@app.post("/api/inventory/update")
async def inventory_update(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Update inventory"""
    result = orchestrator.inventory_agent.process(payload)
    return result


# Price endpoints (proxy to Price Agent)
@app.post("/api/pricing/calculate")
async def pricing_calculate(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Calculate price with discounts"""
    result = orchestrator.price_agent.process(payload)
    return result


@app.post("/api/pricing/recommend")
async def pricing_recommend(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Get pricing recommendations"""
    result = orchestrator.price_agent.process(payload)
    return result


# Audit endpoints (proxy to Audit Agent)
@app.post("/api/audit/compliance-check")
async def audit_compliance_check(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Run compliance checks"""
    result = orchestrator.audit_agent.process(payload)
    return result


# Customer Service endpoints (proxy to Customer Service Agent)
@app.post("/api/customer/profile")
async def customer_profile(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Query customer profile"""
    result = orchestrator.customer_service_agent.process(payload)
    return result


@app.post("/api/customer/support-ticket")
async def customer_support_ticket(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Create support ticket"""
    result = orchestrator.customer_service_agent.process(payload)
    return result


@app.post("/api/customer/loyalty")
async def customer_loyalty(
    payload: Dict[str, Any],
    orchestrator=Depends(get_orchestrator_instance),
):
    """Manage customer loyalty points"""
    result = orchestrator.customer_service_agent.process(payload)
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
