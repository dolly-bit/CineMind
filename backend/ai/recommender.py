import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from pathlib import Path

from app.database.connection import SessionLocal
from app.models.movie import Movie


BASE_DIR = Path(__file__).resolve().parent.parent

# Lazy-load the ML model
model = None

# Load FAISS index and movie IDs
index = faiss.read_index(
    str(BASE_DIR / "movie_index.faiss")
)

movie_ids = np.load(
    str(BASE_DIR / "movie_ids.npy")
)


def get_model():
    global model

    if model is None:
        model = SentenceTransformer("all-MiniLM-L6-v2")

    return model


def recommend_movies(movie_name: str, top_k: int = 10):

    db = SessionLocal()

    try:
        movie = (
            db.query(Movie)
            .filter(Movie.title.ilike(f"%{movie_name}%"))
            .first()
        )

        if not movie:
            return []

        text = f"""
        Title: {movie.title}
        Overview: {movie.overview or ""}
        Language: {movie.original_language or ""}
        """

        # Load model only when recommendation is requested
        model_instance = get_model()

        embedding = model_instance.encode(
            [text]
        ).astype("float32")

        _, indices = index.search(
            embedding,
            top_k + 1
        )

        recommendations = []

        for idx in indices[0]:

            if idx < 0 or idx >= len(movie_ids):
                continue

            movie_id = int(movie_ids[idx])

            if movie_id == movie.id:
                continue

            rec_movie = (
                db.query(Movie)
                .filter(Movie.id == movie_id)
                .first()
            )

            if rec_movie:
                recommendations.append({
                    "id": rec_movie.id,
                    "title": rec_movie.title,
                    "poster_url": (
                        f"https://image.tmdb.org/t/p/w500"
                        f"{rec_movie.poster_path}"
                        if rec_movie.poster_path
                        else None
                    ),
                    "overview": rec_movie.overview,
                    "rating": rec_movie.vote_average,
                    "release_date": rec_movie.release_date,
                })

        return recommendations[:top_k]

    finally:
        db.close()