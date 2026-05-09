from fastapi import FastAPI, Body
app = FastAPI()

log = []

@app.get("/health")
def health():
    return {"status": "ok", "service": "notification-service"}

@app.post("/notify")
def notify(message: str = Body(..., embed=True)):
    log.append(message)
    return {"status": "sent"}

@app.get("/notify")
def get_log():
    return {"notifications": log}
