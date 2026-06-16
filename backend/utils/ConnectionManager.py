from fastapi import WebSocket
from typing import Dict

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        # This is a hashMap / dictionary. contains mapping user_id -> websocket connection
    
    # This initializes a connection
    # Now our user with his/her user id has his/her own websocket pathway
    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print("==> REGISTRY : LINKED " + user_id + " TO AN ACTIVE WEBSOCKET PIPELINE!!!!")
        self.print_registry()
    
    # This in case of network lost / logout etc
    async def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            print("==> REGISTRY : REMOVED ", + user_id + " FROM MEMORY. WEBSOCKET PATHWAY TERMINATED...")
            self.print_registry()

    def print_registry(self):
       
        print("====== CURRENT ACTIVE REGISTRY ======")
        if not self.active_connections:
            print("{ Empty - No active connections }")
        else:
            for uid in self.active_connections.keys():
                print(f" => User ID: {uid} -> Status: ACTIVE_STREAM")
        print("=====================================\n")