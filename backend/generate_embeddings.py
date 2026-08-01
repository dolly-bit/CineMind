import numpy as np
from app.database.connection import SessionLocal
from app.models.movie import Movie
from ai.embeddings import get_movie_embedding

db = SessionLocal()

movies = db.query(Movie).all()

embeddings = []
movie_ids = []

for movie in movies:
    embedding = get_movie_embedding(movie)
    embeddings.append(embedding)
    movie_ids.append(movie.id)

embeddings = np.array(embeddings)

np.save("movie_embeddings.npy", embeddings)
np.save("movie_ids.npy", movie_ids)

print(f"Generated embeddings for {len(movie_ids)} movies.")