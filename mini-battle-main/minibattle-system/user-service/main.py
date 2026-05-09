from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
import hashlib
import os

app = FastAPI()

client = AsyncIOMotorClient(os.getenv("MONGO_URL", "mongodb://mongo:27017"))
db = client["minibattle"]
users_collection = db["users"]

class User(BaseModel):
    username: str
    password: str

@app.post("/register")
async def register(user: User):
    if await users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="User exists")
    hashed = hashlib.sha256(user.password.encode()).hexdigest()
    doc = {"username": user.username, "password": hashed}
    result = await users_collection.insert_one(doc)
    return {"id": str(result.inserted_id), "username": user.username}
