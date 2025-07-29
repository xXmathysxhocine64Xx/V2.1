#!/usr/bin/env python3
"""
WebCraft - Backend Ultra-Simple
Site web moderne avec API minimale
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
import os
from datetime import datetime
import uuid

# Configuration simple
app = FastAPI(title="WebCraft API", version="2.0.0")

# CORS pour le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fichier de stockage simple (JSON)
DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")

# Modèles Pydantic
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = ""
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    company: str
    phone: str
    service: str
    message: str
    created_at: str

# Utilitaires de stockage
def load_data():
    """Charge les données depuis le fichier JSON"""
    if not os.path.exists(DATA_FILE):
        return {"contacts": []}
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {"contacts": []}

def save_data(data):
    """Sauvegarde les données dans le fichier JSON"""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Routes API
@app.get("/api/")
async def root():
    """Route de base pour vérifier que l'API fonctionne"""
    return {
        "message": "WebCraft API v2.0 - Ultra Simple",
        "status": "running",
        "endpoints": ["/api/contact", "/api/contacts"]
    }

@app.post("/api/contact", response_model=ContactResponse)
async def create_contact(contact: ContactMessage):
    """Créer un nouveau message de contact"""
    try:
        # Charger les données existantes
        data = load_data()
        
        # Créer le nouveau contact
        new_contact = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "company": contact.company or "",
            "phone": contact.phone or "",
            "service": contact.service or "",
            "message": contact.message,
            "created_at": datetime.now().isoformat()
        }
        
        # Ajouter aux données
        data["contacts"].append(new_contact)
        
        # Sauvegarder
        save_data(data)
        
        return new_contact
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la sauvegarde: {str(e)}")

@app.get("/api/contacts", response_model=List[ContactResponse])
async def get_contacts():
    """Récupérer tous les messages de contact"""
    try:
        data = load_data()
        # Trier par date (plus récent d'abord)
        contacts = sorted(data["contacts"], key=lambda x: x["created_at"], reverse=True)
        return contacts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Vérification de santé du service"""
    try:
        # Vérifier l'accès aux données
        data = load_data()
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "contacts_count": len(data.get("contacts", []))
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

# Point d'entrée pour uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)