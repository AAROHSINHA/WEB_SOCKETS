from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routes.users import router as users_router

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
@app.websocket("/ws/echo")
async def websocket_endpoint(websocket: WebSocket):
    # Accept an incoming web socket request
    await websocket.accept()
    # This is the basic start point. When an http request comes demanding
    # for a websocket connection, we accept that
    print("==> NEW WEBSOCKET CONNECTION ESTABLISHED")

    try:
        while True:
            # This is infinite loop. signifies constant connection
            # when data comes we recieve it and here in this case we resent it back
            data = await websocket.receive_text()
            print("==> RECIEVED TEXT - ", data)
            await websocket.send_text(f"==> BOUNCED BACK SAME DATA FROM SERVER - {data}")

    # This when the websocket disconencts. network turns off etc
    except WebSocketDisconnect:
        print("==> CONNECTION FROM CLIENT DROPPED")


