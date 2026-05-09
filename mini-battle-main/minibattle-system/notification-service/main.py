from fastapi import FastAPI, Body
app = FastAPI()

log = []

@app.post("/notify")
def notify(message: str = Body(..., embed=True)):
    log.append(message)
    return {"status": "sent"}

@app.get("/notify")
def get_log():
    return {"notifications": log}
