from fastapi import APIRouter
from backend.database.database import session
from backend.database.comment.models import Comment
from sqlalchemy import select,insert

router = APIRouter(prefix="/comment",tags=["comment"])

@router.get("/")
async def get_all():
    try:
        async with session.begin() as sess:
            query = select(Comment)
            result = await sess.execute(query)
            return result.mappings().all()
    except:
        return 0
    
@router.get("/insert")
async def get_all(name:str,description:str):
    try:
        async with session.begin() as sess:
            query = insert(Comment).values(name = name,description = description)
            result = await sess.execute(query)
            return 1
    except:
        return 0