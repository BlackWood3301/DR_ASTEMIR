from sqlalchemy.orm import Mapped,mapped_column
from backend.database.database import Base

class Comment(Base):
    __tablename__ = "comment"

    id: Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str]
    description:Mapped[str]