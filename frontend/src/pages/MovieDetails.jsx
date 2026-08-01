import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Star, Play } from "lucide-react";
import { getMovieCast,
    getSimilarMovies,
    getMovieDetails, 
    getMovieTrailer,
  saveWatchHistory, }
     from "../services/movies";
import MovieCard from "../components/home/MovieCard";


export default function MovieDetails() {
   
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast,setCast]=useState([]);
  const[similarMovies, setSimilarMovies]=useState([]);
  const [userRating, setUserRating]=useState(0);
  const[hoverRating, setHoverRating]=useState(0);
   

  useEffect(() => {
    loadMovie();
  }, [id]);

  async function loadMovie() {
    try {
      const [movieData, trailerData, castData, similarData] = await Promise.all([
        getMovieDetails(id),
        getMovieTrailer(id).catch(() => ({ url: null })),
        getMovieCast(id).catch(() => []),
        getSimilarMovies(id).catch(() => []),
      ]);

      setMovie(movieData);
      setTrailer(trailerData?.url || null);
      setCast(castData || []);
      setSimilarMovies(similarData || []);

      const userId = localStorage.getItem("user_id");
      if (userId) {
        saveWatchHistory(userId, movieData.id).catch(() => {
          console.log("Watch history not saved");
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08070C] flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#08070C] flex items-center justify-center text-white">
        Movie not found.
      </div>
    );
  }
    


  return (
    <div className="min-h-screen bg-[#08070C] text-white">

      {/* Backdrop */}
      <div
        className="relative h-[85vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop_url})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 rounded-full bg-black/60 p-3 hover:bg-red-600 transition"
        >
          <ArrowLeft />
        </button>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-8 pb-12">

          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-72 rounded-2xl shadow-2xl"
          />

          <div className="ml-10 max-w-3xl">

            <h1 className="text-6xl font-extrabold">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-3 text-xl italic text-purple-400">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-wrap gap-8 mt-6">

              <div className="flex items-center gap-2">
                <Star
                  size={20}
                  fill="#FACC15"
                  className="text-yellow-400"
                />
                <span>{movie.vote_average?.toFixed(1)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{movie.release_date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{movie.runtime} min</span>
              </div>

            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-3 mt-6">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-purple-600/30 border border-purple-500 px-4 py-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="mt-8 text-lg text-gray-300 leading-8">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="flex gap-5 mt-10">

              {trailer && (
                <a
                  href={trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-semibold hover:bg-red-700 transition"
                >
                  <Play size={20} />
                  Watch Trailer
                </a>
              )}

              <button
                onClick={() => navigate(-1)}
                className="rounded-xl bg-white/10 px-7 py-4 hover:bg-white/20 transition"
              >
                Back
              </button>

            </div>
           

          </div>

        </div>
        </div>
         {/* Cast */}
<div className="max-w-7xl mx-auto px-8 py-12">

  <h2 className="text-3xl font-bold mb-8">
    🎭 Cast
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

    {cast.map((actor) => (
      <div key={actor.id} className="text-center">

        <img
          src={
            actor.profile_url ||
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={actor.name}
          className="w-full h-64 object-cover rounded-xl"
        />

        <h3 className="mt-3 font-semibold">
          {actor.name}
        </h3>

        <p className="text-gray-400 text-sm">
          {actor.character}
        </p>

      </div>
    ))}

  </div>

</div>

            
{/* Similar Movies */}

<div className="max-w-7xl mx-auto px-8 pb-16">

  <h2 className="text-3xl font-bold mb-8">
    🎬 Similar Movies
  </h2>

  <div className="flex gap-6 overflow-x-auto scrollbar-hide">

    {similarMovies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    ))}

  

</div>
      </div>

    </div>
  );
}