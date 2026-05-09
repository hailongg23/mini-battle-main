from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
app = FastAPI()

games = {}

class Action(BaseModel):
    match_id: str
    player: str
    action: str

@app.post("/game/start")
def start(match_id: str, players: list[str]):
    games[match_id] = {"players": players, "turn": players[0], "log": []}
    return {"message": "Game started"}

@app.post("/game/action")
def act(data: Action):
    g = games.get(data.match_id)
    if not g or g["turn"] != data.player:
        raise HTTPException(400, "Invalid turn")
    g["log"].append(f"{data.player} does {data.action}")
    g["turn"] = [p for p in g["players"] if p != data.player][0]
    return {"log": g["log"], "next_turn": g["turn"]}
