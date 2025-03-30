from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import sys
import os

# Добавляем корень проекта в sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from app.backend.database.config import DATABASE_URL

# Убираем prefixed async
if DATABASE_URL.startswith('postgresql+asyncpg'):
    engine = create_async_engine(DATABASE_URL)
else:
    # Создаем асинхронное подключение, добавляя префикс asyncpg, если его нет
    async_url = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')
    engine = create_async_engine(async_url)

async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

async def get_session():
    async with async_session() as session:
        yield session