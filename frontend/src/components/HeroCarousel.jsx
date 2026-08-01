import React, { useEffect, useRef, useState } from "react";
import { Play, Info, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroCarousel({ slides = [] }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slides.length) return;

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [slides]);

  if (!slides.length) return null;

  const movie = slides[active];

  return (
    <section className="relative h-[520px] overflow-hidden">
      {/* Background */}
      <img
        src={movie.backdrop_url || movie.poster_url}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex h-full items-center px-8 lg:px-16">
        <div className="max-w-2xl">

          <h1 className="text-5xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-6 line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex items-center gap-5 mb-6">

            <div className="flex items-center gap-2">
              <Star fill="gold" color="gold" size={18} />
              <span className="text-yellow-400">
                {(movie.vote_average ?? 0).toFixed(1)}
              </span>
            </div>

            <span className="text-gray-400">
              {movie.release_date?.substring(0, 4)}
            </span>

          </div>

          <div className="flex gap-4">

            <button
              className="flex items-center gap-2 bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              <Play size={18} />
              Watch Now
            </button>

            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="flex items-center gap-2 border border-white/30 px-6 py-3 rounded-lg"
            >
              <Info size={18} />
              More Info
            </button>

          </div>

        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`rounded-full transition-all ${
              active === index
                ? "bg-purple-500 w-8 h-2"
                : "bg-white/50 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}