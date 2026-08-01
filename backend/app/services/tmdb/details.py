from app.services.tmdb.client import tmdb_get


def get_movie_details(movie_id: int):
    return tmdb_get(f"movie/{movie_id}")