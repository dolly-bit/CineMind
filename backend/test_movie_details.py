from app.services.tmdb.details import get_movie_details

movie = get_movie_details(157336)  # Interstellar

print(movie["title"])
print(movie["runtime"])
print(movie["release_date"])
print(movie["tagline"])