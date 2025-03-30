from app.backend.database.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text

class Pozdravlenia(Base):
    __tablename__ = "pozd"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text)