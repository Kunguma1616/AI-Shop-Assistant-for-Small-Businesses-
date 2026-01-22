"""Pydantic models for typed messages exchanged between agents.

These models are baseline schemas — extend them as needed.
"""
from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional
from datetime import datetime

class TaskDescriptor(BaseModel):
    objective: str
    constraints: Optional[Dict[str, Any]] = None
    requiredData: List[Dict[str, Any]] = []
    priority: Optional[str] = "normal"
    clarify: Optional[bool] = False

class StructuredData(BaseModel):
    source: str
    schema_version: str
    timestamp: datetime
    payload: Dict[str, Any]
    metadata: Optional[Dict[str, Any]] = None

class Decision(BaseModel):
    action: str
    rationale: List[str]
    confidence: float = Field(..., ge=0.0, le=1.0)
    metadata: Optional[Dict[str, Any]] = None

class UIResponse(BaseModel):
    text: Optional[List[str]] = None
    cards: Optional[List[Dict[str, Any]]] = None
    actions: Optional[List[Dict[str, Any]]] = None
    safetyTags: Optional[List[str]] = None

class TaskState(BaseModel):
    task_id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    status: str
    descriptor: TaskDescriptor
    decision: Optional[Decision] = None
    ui_response: Optional[UIResponse] = None

class AuditRecord(BaseModel):
    task_id: str
    timestamp: datetime
    actor: str
    payload: Dict[str, Any]
    note: Optional[str] = None
