from fastapi import FastAPI, WebSocket, WebSocketDisconnect
app = FastAPI()

clients = []

@app.get("/health")
def health():
    return {"status": "ok", "service": "chat-service"}

@app.websocket("/ws/chat")
async def chat(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        while True:
            msg = await ws.receive_text()
            for c in clients:
                await c.send_text(msg)
    except WebSocketDisconnect:
        clients.remove(ws)
