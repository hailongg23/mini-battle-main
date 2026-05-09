from fastapi import FastAPI, Request
import httpx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

services = {
    "users": "http://user-service:8000",
    "auth": "http://auth-service:8000",
    "match": "http://match-service:8000",
    "game": "http://game-service:8000",
    "notify": "http://notification-service:8000"
}

@app.get("/health")
async def health():
    return {"status": "ok", "service": "api-gateway"}

@app.api_route("/{svc}/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy(svc: str, path: str, req: Request):
    if svc not in services:
        return {"error": "Unknown service"}
    url = f"{services[svc]}/{path}"
    async with httpx.AsyncClient() as client:
        res = await client.request(
            req.method, url,
            content=await req.body(),
            headers=req.headers
        )
    return res.json()
