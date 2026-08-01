import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./home/MovieCard";
import {
  searchMovies,
  getTrendingMovies,
} from "../services/movies";

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Load Trending
  useEffect(() => {
    if (!isOpen) return;

    async function loadTrending() {
      try {
        const data = await getTrendingMovies();
        setTrending(data.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    }

    loadTrending();
  }, [isOpen]);

  // Live Search
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const data = await searchMovies(query);

        setMovies(data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-start pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: -30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-[95%] max-w-6xl h-[82vh] rounded-3xl bg-[#121212] border border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
        >

          {/* Search Bar */}

          <div className="flex items-center gap-4 px-8 py-6 border-b border-zinc-800">

            <Search
              size={24}
              className="text-purple-500"
            />

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="flex-1 bg-transparent outline-none text-xl text-white placeholder:text-zinc-500"
            />

            <button
              onClick={onClose}
            >
              <X
                className="text-zinc-400 hover:text-white"
              />
            </button>

          </div>

          {/* Content */}

          <div className="flex-1 overflow-y-auto p-8">
            {/* Trending Movies */}

{!query && (
  <>
    <h2 className="text-2xl font-bold mb-6">
      🔥 Trending Movies
    </h2>

    <div className="flex  gap-5 overflow-x-auto scrollbar-hide pb-2">

      {trending.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          />
      ))}
    </div>
  </>
)}

{/* Search Results */}

{query && (
  <>
    <h2 className="text-2xl font-bold mb-6">
      Search Results
    </h2>

    {loading ? (
      <div className="text-center text-gray-400 py-20">
        Searching...
      </div>
    ) : movies.length === 0 ? (
      <div className="text-center text-gray-400 py-20">
        No movies found
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    )}
  </>
)}
</div>
</motion.div>
</motion.div>
</AnimatePresence>
  );
}