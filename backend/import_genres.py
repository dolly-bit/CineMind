from app.database.connection import SessionLocal
from app.services.tmdb.genres import import_genres

db = SessionLocal()

try:
    total = import_genres(db)
    print(f"{total} genres imported successfully.")
finally:
    db.close()