import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

from app.database.connection import SessionLocal
from app.models.movie import Movie

# Load model and FAISS index
model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("movie_index.faiss")

# Load movie IDs
movie_ids = np.load("movie_ids.npy")


def recommend_movies(movie_name: str, top_k: int = 10):
    db = SessionLocal()

    movie = (
        db.query(Movie)
        .filter(Movie.title.ilike(f"%{movie_name}%"))
        .first()
    )

    if not movie:
        db.close()
        return []

    text = f"""
    Title: {movie.title}
    Overview: {movie.overview or ""}
    Language: {movie.original_language or ""}
    """

    embedding = model.encode([text]).astype("float32")

    _, indices = index.search(embedding, top_k + 1)

    recommendations = []

    for idx in indices[0]:
        movie_id = int(movie_ids[idx])

        if movie_id == movie.id:
            continue

        rec_movie = db.query(Movie).filter(Movie.id == movie_id).first()

        if rec_movie:
            recommendations.append({
    "id": rec_movie.id,
    "title": rec_movie.title,
    "poster_url": (
        f"https://image.tmdb.org/t/p/w500{rec_movie.poster_path}"
        if rec_movie.poster_path else None
    ),
    "overview": rec_movie.overview,
    "rating": rec_movie.vote_average,
    "release_date": rec_movie.release_date,
})
            

    db.close()
    return recommendations[:top_k]