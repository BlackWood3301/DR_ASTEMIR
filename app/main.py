from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import os
from backend.database.pozdravlenia.router import router as pozdrav_rout
from backend.database.comment.router import router as comment_rout

app = FastAPI()

# Добавьте настройку CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене лучше указать конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Определяем путь к директории frontend
BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "frontend"

# Подключаем API маршруты
app.include_router(pozdrav_rout)
app.include_router(comment_rout)

# Маршрут для корневой страницы
@app.get("/", response_class=HTMLResponse)
async def read_root():
    return FileResponse(FRONTEND_DIR / "index.html")

# Маршрут для статических файлов
@app.get("/{file_path:path}")
async def read_static(file_path: str):
    file_full_path = FRONTEND_DIR / file_path
    if os.path.isfile(file_full_path):
        return FileResponse(file_full_path)
    
    # Если файл не найден, возвращаем index.html для SPA
    return FileResponse(FRONTEND_DIR / "index.html")