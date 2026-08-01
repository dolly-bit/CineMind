from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models import WatchHistory

router = APIRouter(
    prefix="/watch-history",
    tags=["Watch History"]
)


@router.post("/")
def add_watch_history(
    user_id: int,
    tmdb_id: int,
    db: Session = Depends(get_db)
):
    history = WatchHistory(
        user_id=user_id,
        tmdb_id=tmdb_id,
    )

    db.add(history)
    db.commit()

    return {
        "message": "Watch history saved"
    }