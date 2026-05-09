from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
import os, hashlib, jwt
from datetime import datetime, timedelta

app = FastAPI()
client = AsyncIOMotorClient(os.getenv("MONGO_URL", "mongodb://mongo:27017"))
db = client["minibattle"]
JWT_SECRET = os.getenv("JWT_SECRET", "secret")

class Login(BaseModel):
    username: str
    password: str

@app.post("/login")
async def login(data: Login):
    user = await db["users"].find_one({"username": data.username})
    if not user or user["password"] != hashlib.sha256(data.password.encode()).hexdigest():
        raise HTTPException(status_code=401, detail="Invalid")
    payload = {"sub": data.username, "exp": datetime.utcnow() + timedelta(hours=1)}
    return {"access_token": jwt.encode(payload, JWT_SECRET, algorithm="HS256")}
