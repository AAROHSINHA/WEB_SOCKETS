from typing import List
from fastapi import APIRouter, Depends, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db.responseModels import FetchUsersResponse
from db.models import User
from db.database import get_db
import datetime

router = APIRouter()

# 1. fetch all users
@router.get("/users", response_model=List[FetchUsersResponse])
async def fetch_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    for user in users:
        user.is_online = False
    db.commit()
    return users

# 2. make a user active
@router.patch("/users/active/{user_id}")
async def active_user(user_id: str, db: Session = Depends(get_db)):
    user_found = db.query(User).filter(User.id == user_id).first()
    user_found.is_online = True
    db.commit()
    return JSONResponse(
    status_code=status.HTTP_200_OK,
    content={
        "success": True,
        "message": "User updated"
    })  

# 3. make a user inacttive
@router.patch("/users/inactive/{user_id}")
async def inactive_user(user_id: str, db:Session = Depends(get_db)):
    user_found = db.query(User).filter(User.id == user_id).first()
    if(not user_found.is_online):
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={
                "success": False,
                "message": "User offline"
            }
        )
    user_found.is_online = False
    user_found.last_seen = datetime.utcnow()

    db.commit()
    db.refresh(user_found)

    return JSONResponse(
    status_code=status.HTTP_200_OK,
    content={
        "success": True,
        "message": "User updated"
    }
)

