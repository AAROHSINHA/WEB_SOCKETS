# test_connection.py

from sqlalchemy import text
from database import engine

with engine.connect() as conn:
    result = conn.execute(text("SELECT current_database()"))
    print(result.scalar())