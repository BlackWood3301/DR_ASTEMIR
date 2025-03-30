from fastapi import APIRouter
from sqlalchemy import select,insert
from backend.database.database import session
from backend.database.pozdravlenia.models import *

router = APIRouter(prefix="/pozdravlenia",tags=["Поздравления"])

@router.get("/")
async def get_all_pozdravlenia():
    try:
        async with session.begin() as sess:
            query = select(Pozdravlenia)
            result = await sess.execute(query)
            return result.mappings().all()
    except:
        print("Ошибка в прсомотре")

@router.get("/insert")
async def insert_pozdravlenia(name:str,description:str):
    try:
        async with session.begin() as sess:
            query = insert(Pozdravlenia).values(name = name,description = description)
            await sess.execute(query)
    except:
        print("Ошибка в добавлении")