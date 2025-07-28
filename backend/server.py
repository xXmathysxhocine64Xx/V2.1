from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import os
import logging
import uuid
from datetime import datetime
from fastapi import Depends

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# SQLite Database setup
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///./webcraft.db')
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class ContactRequest(Base):
    __tablename__ = "contact_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    company = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    service = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class StatusCheck(Base):
    __tablename__ = "status_checks"
    
    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models
class ContactRequestCreate(BaseModel):
    name: str
    email: str
    company: str = ""
    phone: str = ""
    service: str = ""
    message: str

class ContactRequestResponse(BaseModel):
    id: int
    name: str
    email: str
    company: str
    phone: str
    service: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class StatusCheckCreate(BaseModel):
    client_name: str

class StatusCheckResponse(BaseModel):
    id: int
    client_name: str
    timestamp: datetime

    class Config:
        from_attributes = True

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create the main app
app = FastAPI(title="WebCraft API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add routes
@api_router.get("/")
async def root():
    return {"message": "WebCraft API is running"}

@api_router.post("/contact", response_model=ContactRequestResponse)
async def create_contact_request(contact: ContactRequestCreate, db: Session = Depends(get_db)):
    try:
        db_contact = ContactRequest(
            name=contact.name,
            email=contact.email,
            company=contact.company,
            phone=contact.phone,
            service=contact.service,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        return db_contact
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@api_router.get("/contact", response_model=List[ContactRequestResponse])
async def get_contact_requests(db: Session = Depends(get_db)):
    try:
        contacts = db.query(ContactRequest).order_by(ContactRequest.created_at.desc()).all()
        return contacts
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/status", response_model=StatusCheckResponse)
async def create_status_check(status: StatusCheckCreate, db: Session = Depends(get_db)):
    try:
        db_status = StatusCheck(client_name=status.client_name)
        db.add(db_status)
        db.commit()
        db.refresh(db_status)
        return db_status
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@api_router.get("/status", response_model=List[StatusCheckResponse])
async def get_status_checks(db: Session = Depends(get_db)):
    try:
        status_checks = db.query(StatusCheck).order_by(StatusCheck.timestamp.desc()).all()
        return status_checks
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
