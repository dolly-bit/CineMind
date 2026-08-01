from sqlalchemy.orm import Session

from app.models.movie import Movie
from app.services.tmdb.client import tmdb_get


def import_popular_movies(db: Session, pages: int = 5):
    count = 0

    seen_tmdb_ids = set()

    for page in range(1, pages + 1):
        data = tmdb_get("movie/popular", {"page": page})

        for item in data["results"]:

            tmdb_id = item["id"]

            if tmdb_id in seen_tmdb_ids:
                continue

            seen_tmdb_ids.add(tmdb_id)

            existing = db.query(Movie).filter(
                Movie.tmdb_id == tmdb_id
            ).first()

            if existing:
                continue

            movie = Movie(
                tmdb_id=tmdb_id,
                title=item["title"],
                original_title=item.get("original_title"),
                overview=item.get("overview"),
                poster_path=item.get("poster_path"),
                backdrop_path=item.get("backdrop_path"),
                vote_average=item.get("vote_average"),
                vote_count=item.get("vote_count"),
                popularity=item.get("popularity"),
                original_language=item.get("original_language"),
                adult=item.get("adult", False)
            )

            db.add(movie)
            count += 1

    db.commit()
    return count

def get_trending_movies():
    data = tmdb_get("trending/movie/week")
    return data.get("results", [])


def get_top_rated_movies():
    data = tmdb_get("movie/top_rated")
    return data.get("results", [])


def get_upcoming_movies():
    data = tmdb_get("movie/upcoming")
    return data.get("results", [])


def search_movies(query: str):
    data = tmdb_get(
        "search/movie",
        {
            "query": query,
            "include_adult": False,
        },
    )
    return data.get("results", [])
