import { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHero({ movies = [] }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) {
    return (
      <section className="relative h-[75vh] overflow-hidden bg-[#08070C]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.28),_transparent_45%)]" />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-xl rounded-[28px] border border-white/10 bg-white/10 px-8 py-10 text-center backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Now showing</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Discover your next favorite movie</h1>
            <p className="mt-3 text-sm text-slate-300">We’re loading the featured picks now.</p>
          </div>
        </div>
      </section>
    );
  }

  const movie = movies[current];

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background */}
      <img
        src={movie.backdrop_url}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08070C] via-[#08070C]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08070C] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6 lg:px-10">
        <div className="max-w-2xl">

          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-5">
            FEATURED
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white">
            {movie.title}
          </h1>

          <div className="flex items-center gap-6 mt-5 text-gray-300">
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>📅 {movie.release_date}</span>
          </div>

          <p className="mt-6 text-lg text-gray-300 leading-8 line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex gap-4 mt-10">

            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-7 py-4 rounded-xl text-white font-semibold"
            >
              <Play size={20} />
              Watch Now
            </button>

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-7 py-4 rounded-xl text-white font-semibold"
            >
              <Info size={20} />
              More Info
            </button>

          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-10 h-2 bg-red-500"
                : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}