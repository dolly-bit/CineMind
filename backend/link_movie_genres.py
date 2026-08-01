from app.database.connection import SessionLocal
from app.models.movie import Movie
from app.models.genre import Genre
from app.models.movie_genre import MovieGenre
from app.services.tmdb.details import get_movie_details

db = SessionLocal()

try:
    movies = db.query(Movie).all()

    count = 0

    for movie in movies:
        details = get_movie_details(movie.tmdb_id)

        for g in details.get("genres", []):

            genre = db.query(Genre).filter(
                Genre.tmdb_id == g["id"]
            ).first()

            if not genre:
                continue

            existing = db.query(MovieGenre).filter(
                MovieGenre.movie_id == movie.id,
                MovieGenre.genre_id == genre.id
            ).first()

            if existing:
                continue

            db.add(
                MovieGenre(
                    movie_id=movie.id,
                    genre_id=genre.id
                )
            )

            count += 1

    db.commit()

    print(f"{count} movie-genre relationships created.")

finally:
    db.close()