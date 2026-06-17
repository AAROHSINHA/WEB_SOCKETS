from fastapi import WebSocket
from typing import Dict
from db.database import SessionLocal
from db.models import User, Message
import datetime

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        # This is a hashMap / dictionary. contains mapping user_id -> websocket connection
    
    # This initializes a connection
    # Now our user with his/her user id has his/her own websocket pathway
    async def connect(self, websocket: WebSocket, user_id: str, db):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.is_online = True
            db.commit()
        print("==> REGISTRY : LINKED " + user_id + " TO AN ACTIVE WEBSOCKET PIPELINE!!!!")
        self.print_registry()
    
    # This in case of network lost / logout etc
    async def disconnect(self, user_id: str, db):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                user.is_online = False
                user.last_seen = datetime.datetime.utcnow()
            print("==> REGISTRY : REMOVED " + user_id + " FROM MEMORY. WEBSOCKET PATHWAY TERMINATED...")
            self.print_registry()

    async def send_personal_message(self, message: str, target_user_id: str):
        if target_user_id in self.active_connections:
            target_websocket = self.active_connections[target_user_id]
            await target_websocket.send(message)
            print(f"==> INBOX: Succesfully routed message to {target_user_id}")
        else:
            print(f"==> INBOX: {target_user_id} IS OFFLINE. MESSAGE SAVED TO DATABASE")

    def print_registry(self):
       
        print("====== CURRENT ACTIVE REGISTRY ======")
        if not self.active_connections:
            print("{ Empty - No active connections }")
        else:
            for uid in self.active_connections.keys():
                print(f" => User ID: {uid} -> Status: ACTIVE_STREAM")
        print("=====================================\n")