from app.backend.database.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, Integer
from datetime import date

class Post(Base):
    __tablename__ = "post"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)
    created_at: Mapped[date]
    image_id: Mapped[int] = mapped_column(Integer)