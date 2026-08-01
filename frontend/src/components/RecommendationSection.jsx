import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPersonalizedRecommendations } from "../services/movies";

export default function RecommendedSection() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadRecommendations() {
      try {
        const data = await getPersonalizedRecommendations(userId);
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-400">
        Loading recommendations...
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mt-20">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-purple-400 mb-2">
            Your AI picks
          </p>
          <h2 className="text-3xl font-bold text-white">🎯 Recommended For You</h2>
        </div>
        <p className="text-sm text-gray-400 max-w-xl">
          Explore movies chosen by your personalized AI recommendation engine.
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group relative min-w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-[#0D0B13] shadow-[0_26px_80px_rgba(81,44,211,0.15)] transition duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_24px_80px_rgba(139,92,246,0.35)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-400/10 opacity-70" />
            <div className="overflow-hidden rounded-[28px]">
              <img
                src={
                  movie.poster_url ||
                  (movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster")
                }
                alt={movie.title}
                className="h-[330px] w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-x-3 top-3 z-30 flex items-center justify-between">
              <div className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-yellow-300 backdrop-blur">
                ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 w-full p-4">
                <h3 className="line-clamp-2 text-lg font-bold text-white">
                  {movie.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 line-clamp-2">
                  {movie.overview || "Curated just for your next watch."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}