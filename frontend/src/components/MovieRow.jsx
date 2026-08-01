import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PosterCard from "./PosterCard";

export default function MovieRow({
  title,
  subtitle,
  movies = [],
}) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: direction * 900,
      behavior: "smooth",
    });
  };

  if (!movies.length) return null;

  return (
    <section className="px-4 sm:px-6 py-5">
      <div className="mx-auto max-w-7xl flex items-end justify-between mb-4">

        <div>
          {subtitle && (
            <p className="text-xs uppercase tracking-widest text-purple-400 mb-1">
              {subtitle}
            </p>
          )}

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-purple-600 flex items-center justify-center transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-purple-600 flex items-center justify-center transition"
          >
            <ChevronRight />
          </button>

        </div>

      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {movies.map((movie) => (
          <PosterCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
}