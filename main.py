# Synova AI Backend - Main API Server
# This is the core of your AI platform that handles all requests

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import time
import random
import sqlite3
import hashlib
from datetime import datetime

# Initialize the FastAPI application
app = FastAPI(title="Synova AI API", version="1.0.0")

# Enable CORS (allows your website to talk to your API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup (using SQLite for simplicity)
def init_database():
    conn = sqlite3.connect('synova.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE,
            password_hash TEXT,
            tier TEXT DEFAULT 'terrestrial',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            message_count INTEGER DEFAULT 0,
            last_reset TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            message TEXT,
            response TEXT,
            tier TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_database()

# Data models (these define what data your API expects)
class QueryRequest(BaseModel):
    query: str
    tier: str = "terrestrial"
    user_id: Optional[int] = None

class UserRegistration(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# AI Response Generation (This is where the magic happens!)
class SynovaAI:
    def __init__(self):
        self.responses = {
            "terrestrial": {
                "greeting": "Hello! I'm Synova Terrestrial, your free AI assistant. How can I help you today?",
                "help": "I can help with basic questions and simple conversations. For advanced features, consider upgrading to Aerial or Celestial!",
                "features": "Free tier includes: Basic AI responses, ethical guidelines, and 50 messages per day. Upgrade for more features!",
                "upgrade": "Ready to unlock more power? Aerial ($19/month) offers unlimited messages and advanced reasoning. Celestial ($49/month) includes quantum predictions!",
                "default": "Thank you for your question. As a free tier user, I provide basic assistance. For advanced analysis, consider upgrading!"
            },
            "aerial": {
                "greeting": "Welcome to Synova Aerial! I'm your advanced AI assistant with enhanced reasoning capabilities.",
                "analysis": "Using advanced neuro-symbolic reasoning to analyze your request...",
                "prediction": "Based on temporal analysis and pattern recognition, here are my insights:",
                "default": "I'm analyzing this with advanced AI techniques including pattern recognition and contextual reasoning."
            },
            "celestial": {
                "greeting": "Greetings! I'm Synova Celestial with full quantum-enhanced capabilities at your service.",
                "quantum": "Applying quantum-inspired algorithms for maximum prediction accuracy...",
                "temporal": "Using temporal weave analysis to understand context and predict outcomes...",
                "default": "Engaging full quantum-enhanced processing with neuro-symbolic fusion for optimal results."
            }
        }
    
    def generate_response(self, query: str, tier: str) -> dict:
        """Generate AI response based on query and tier"""
        
        # Simulate processing time (makes it feel more realistic)
        processing_time = {
            "terrestrial": random.uniform(2, 4),
            "aerial": random.uniform(1, 2),
            "celestial": random.uniform(0.5, 1)
        }
        
        time.sleep(processing_time[tier])
        
        # Simple keyword matching for demo (you can enhance this later)
        query_lower = query.lower()
        tier_responses = self.responses[tier]
        
        # Check for specific keywords
        if any(word in query_lower for word in ["hello", "hi", "hey", "greeting"]):
            response = tier_responses["greeting"]
        elif any(word in query_lower for word in ["help", "what can you do"]):
            response = tier_responses.get("help", tier_responses["default"])
        elif any(word in query_lower for word in ["feature", "upgrade", "tier"]):
            response = tier_responses.get("upgrade", tier_responses["default"])
        elif tier == "aerial" and any(word in query_lower for word in ["analyze", "analysis"]):
            response = tier_responses["analysis"]
        elif tier == "celestial" and any(word in query_lower for word in ["quantum", "predict"]):
            response = tier_responses["quantum"]
        else:
            response = tier_responses["default"]
        
        # Add tier-specific enhancements
        confidence = {
            "terrestrial": random.uniform(0.6, 0.8),
            "aerial": random.uniform(0.75, 0.9),
            "celestial": random.uniform(0.85, 0.95)
        }[tier]
        
        return {
            "response": response,
            "confidence": confidence,
            "tier": tier,
            "processing_time": processing_time[tier],
            "timestamp": datetime.now().isoformat()
        }

# Initialize AI
synova_ai = SynovaAI()

# Utility functions
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_user_limits(user_id: int, tier: str) -> bool:
    """Check if user has exceeded their usage limits"""
    if tier != "terrestrial":
        return True  # Paid tiers have unlimited usage
    
    conn = sqlite3.connect('synova.db')
    cursor = conn.cursor()
    
    # Check message count for free tier
    cursor.execute('SELECT message_count, last_reset FROM users WHERE id = ?', (user_id,))
    result = cursor.fetchone()
    
    if not result:
        conn.close()
        return False
    
    message_count, last_reset = result
    last_reset_date = datetime.fromisoformat(last_reset)
    
    # Reset count if it's a new day
    if datetime.now().date() > last_reset_date.date():
        cursor.execute('UPDATE users SET message_count = 0, last_reset = ? WHERE id = ?', 
                      (datetime.now(), user_id))
        conn.commit()
        message_count = 0
    
    conn.close()
    return message_count < 50  # Free tier limit

# API Endpoints (These are the URLs your frontend will call)

@app.get("/")
async def root():
    """Welcome endpoint"""
    return {"message": "Welcome to Synova AI API", "status": "active", "version": "1.0.0"}

@app.post("/api/query")
async def process_query(request: QueryRequest):
    """Main AI query processing endpoint"""
    
    # Validate query length based on tier
    max_lengths = {"terrestrial": 200, "aerial": 2000, "celestial": 8000}
    if len(request.query) > max_lengths[request.tier]:
        raise HTTPException(
            status_code=400, 
            detail=f"Query too long for {request.tier} tier. Maximum {max_lengths[request.tier]} characters."
        )
    
    # Check user limits for free tier
    if request.user_id and request.tier == "terrestrial":
        if not verify_user_limits(request.user_id, request.tier):
            raise HTTPException(
                status_code=429, 
                detail="Daily message limit reached. Please upgrade or try again tomorrow."
            )
    
    try:
        # Generate AI response
        ai_response = synova_ai.generate_response(request.query, request.tier)
        
        # Save to database if user is logged in
        if request.user_id:
            conn = sqlite3.connect('synova.db')
            cursor = conn.cursor()
            
            # Save message
            cursor.execute('''
                INSERT INTO messages (user_id, message, response, tier)
                VALUES (?, ?, ?, ?)
            ''', (request.user_id, request.query, ai_response["response"], request.tier))
            
            # Update message count for free tier
            if request.tier == "terrestrial":
                cursor.execute('''
                    UPDATE users SET message_count = message_count + 1 
                    WHERE id = ?
                ''', (request.user_id,))
            
            conn.commit()
            conn.close()
        
        return {
            "success": True,
            "data": ai_response
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")

@app.post("/api/register")
async def register_user(user: UserRegistration):
    """User registration endpoint"""
    
    conn = sqlite3.connect('synova.db')
    cursor = conn.cursor()
    
    # Check if user already exists
    cursor.execute('SELECT id FROM users WHERE email = ?', (user.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new user
    password_hash = hash_password(user.password)
    cursor.execute('''
        INSERT INTO users (email, password_hash, tier)
        VALUES (?, ?, 'terrestrial')
    ''', (user.email, password_hash))
    
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": user_id
    }

@app.post("/api/login")
async def login_user(user: UserLogin):
    """User login endpoint"""
    
    conn = sqlite3.connect('synova.db')
    cursor = conn.cursor()
    
    password_hash = hash_password(user.password)
    cursor.execute('''
        SELECT id, tier, message_count FROM users 
        WHERE email = ? AND password_hash = ?
    ''', (user.email, password_hash))
    
    result = cursor.fetchone()
    conn.close()
    
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user_id, tier, message_count = result
    
    return {
        "success": True,
        "user_id": user_id,
        "tier": tier,
        "message_count": message_count
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "ai_system": "operational"
    }

@app.get("/api/stats")
async def get_stats():
    """Get platform statistics"""
    
    conn = sqlite3.connect('synova.db')
    cursor = conn.cursor()
    
    # Get user counts by tier
    cursor.execute('SELECT tier, COUNT(*) FROM users GROUP BY tier')
    tier_counts = dict(cursor.fetchall())
    
    # Get total messages
    cursor.execute('SELECT COUNT(*) FROM messages')
    total_messages = cursor.fetchone()[0]
    
    conn.close()
    
    return {
        "users_by_tier": tier_counts,
        "total_messages": total_messages,
        "platform_status": "operational" 
    }

# Run the server when this file is executed
if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Synova AI API Server...")
    print("📍 API will be available at: http://localhost:8000")
    print("📚 API documentation at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)