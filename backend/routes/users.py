from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.responseModels import FetchUsersResponse
from db.models import User
from db.database import get_db

router = APIRouter()

@router.get("/users", response_model=List[FetchUsersResponse])
def fetch_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users