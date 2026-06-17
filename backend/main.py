from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routes.users import router as users_router
from utils.ConnectionManager import ConnectionManager
import json

from db.database import SessionLocal
from db.models import User, Message

app = FastAPI()
app.include_router(users_router)


# 1. Define the exact addresses that are allowed to talk to your server
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# 2. Add the CORS middleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Only allow these specific addresses
    allow_credentials=True, # Allows cookies and authentication headers
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)


## 1. BASIC WEBSOCKET CONNECTION 
# User logs in (gets selected in frontend)...a connection is made
manager = ConnectionManager() # This is out connection registry

# 1. route - Connect user websocket 
@app.websocket("/ws/chat/{user_id}")
async def websocket_init_connection(websocket: WebSocket, user_id: str):
    db = SessionLocal()
    # Pass the connection to out registry
    await manager.connect(websocket=websocket, user_id=user_id, db=db)

    try:
        while True:
            raw_data = await websocket.receive_text()
            payload = json.loads(raw_data)
            target_id = payload.get("target_id")
            text = payload.get("text")

            # Writing into db
            msg_db = SessionLocal()
            try:
                new_message = Message(sender_id = user_id, receiver_id=target_id, text=text)    
                msg_db.add(new_message)
                msg_db.commit()
            finally:
                msg_db.close()

            outgoing_message = json.dumps({
                "sender_id": user_id,
                "text": text
            })
            await manager.send_personal_message(outgoing_message, target_id)

    except WebSocketDisconnect:
        await manager.disconnect(user_id=user_id, db=db)
    except json.JSONDecodeError:
        print("Received invalid JSON data")

