from fastapi import APIRouter

router = APIRouter(prefix="/pozdravlenia")

@router.get("/")
def get_all_pozdravlenia():
    pass