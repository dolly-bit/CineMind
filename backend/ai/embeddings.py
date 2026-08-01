from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def get_movie_embedding(movie):
    text = f"""
    Title: {movie.title}
    Overview: {movie.overview or ""}
    Language: {movie.original_language or ""}
    """

    return model.encode(text)