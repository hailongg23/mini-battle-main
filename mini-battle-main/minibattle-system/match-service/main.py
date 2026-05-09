from fastapi import FastAPI, HTTPException
app = FastAPI()

waiting = []

@app.get("/health")
def health():
    return {"status": "ok", "service": "match-service"}

@app.post("/match/join")
def join(username: str):
    if username in waiting:
        raise HTTPException(400, "Already waiting")
    waiting.append(username)
    if len(waiting) >= 2:
        p1 = waiting.pop(0)
        p2 = waiting.pop(0)
        return {"match_id": "match123", "players": [p1, p2]}
    return {"message": "Waiting for opponent"}
