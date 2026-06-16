from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routes.users import router as users_router
from utils.ConnectionManager import ConnectionManager

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

# route - 
@app.websocket("/ws/chat/{user_id}")
async def websocket_init_connection(websocket: WebSocket, user_id: str):
    # Pass the connection to out registry
    await manager.connect(websocket=websocket, user_id=user_id)

    try:
        while True:
            data = await websocket.receive_text()
            print(f"==> INBOX: Recieved text from {user_id} - {data}")
    except WebSocketDisconnect:
        manager.disconnect(user_id=user_id)



