from uuid import uuid4

from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    username: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    is_online: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    last_seen: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    sender_id: Mapped[str] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    receiver_id: Mapped[str | None] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True
    )

    text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    is_read: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )