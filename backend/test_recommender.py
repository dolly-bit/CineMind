from ai.recommender import recommend_movies

movies = recommend_movies("Oppenheimer")

for i, movie in enumerate(movies, 1):
    print(f"{i}. {movie}")