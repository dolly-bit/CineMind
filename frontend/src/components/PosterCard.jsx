import { Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PosterCard({ movie }) {
  const navigate = useNavigate();

  const poster =
    movie.poster_url ||
    "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group min-w-[220px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(139,92,246,0.25)]"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111118] shadow-xl">
        <img
          src={poster}
          alt={movie.title}
          className="w-[220px] h-[330px] object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 transition duration-300">
          <button className="w-full rounded-2xl bg-purple-600 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition">
            View Details
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white line-clamp-1">
            {movie.title}
          </h3>
          {movie.release_date && (
            <p className="text-xs text-gray-400">
              {movie.release_date.substring(0, 4)}
            </p>
          )}
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-purple-200">
          {(movie.vote_average ?? 0).toFixed(1)}
        </div>
      </div>
    </div>
  );
}