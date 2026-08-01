from app.database.connection import SessionLocal
from app.services.tmdb.movies import import_popular_movies

db = SessionLocal()

try:
    total = import_popular_movies(db, pages=5)
    print(f"{total} movies imported successfully.")
finally:
    db.close()