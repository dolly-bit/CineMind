from collections import Counter
from sqlalchemy.orm import Session

from app.models import (
    WatchHistory,
    SearchHistory,
    Movie,
    MovieGenre,
    Genre,
)


def get_personalized_recommendations(user_id: int, db: Session):

    # User Watch History
    history = (
        db.query(WatchHistory)
        .filter(WatchHistory.user_id == user_id)
        .all()
    )

    if not history:
        return []

    watched_tmdb_ids = [h.tmdb_id for h in history]

    # Get watched movies
    watched_movies = (
        db.query(Movie)
        .filter(Movie.tmdb_id.in_(watched_tmdb_ids))
        .all()
    )

    genre_counter = Counter()

    watched_movie_ids = []

    for movie in watched_movies:

        watched_movie_ids.append(movie.id)

        movie_genres = (
            db.query(MovieGenre)
            .filter(MovieGenre.movie_id == movie.id)
            .all()
        )

        for g in movie_genres:
            genre_counter[g.genre_id] += 1

    if not genre_counter:
        return []

    favorite_genres = [
        g[0]
        for g in genre_counter.most_common(3)
    ]

    recommended = (
        db.query(Movie)
        .join(MovieGenre)
        .filter(
            MovieGenre.genre_id.in_(favorite_genres),
            ~Movie.id.in_(watched_movie_ids),
        )
        .limit(20)
        .all()
    )

    return recommended