from pydantic import BaseModel
from datetime import datetime

class FetchUsersResponse(BaseModel):
    id: str
    username: str
    is_online: bool
    last_seen: datetime

    class Config:
        from_attributes = True  