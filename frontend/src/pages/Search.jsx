import { useState } from "react";
import { Search } from "lucide-react";
import { searchMovies } from "../services/movies";
import MovieCard from "../components/home/MovieCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#08070C] text-white px-8 py-10">

      <h1 className="text-4xl font-bold mb-8">
        🔍 Search Movies
      </h1>

      <div className="flex gap-4 mb-10">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="flex-1 rounded-xl bg-zinc-900 p-4 outline-none border border-zinc-700"
        />

        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 px-6 rounded-xl flex items-center gap-2"
        >
          <Search size={18} />
          Search
        </button>

      </div>

      {loading && (
        <p className="text-gray-400">Searching...</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}

      </div>

    </div>
  );
}