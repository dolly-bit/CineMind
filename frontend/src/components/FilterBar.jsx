import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/movies";

const GENRES = [
  "All Genres",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const MOODS = [
  "Any Mood",
  "Happy",
  "Dark",
  "Emotional",
  "Funny",
  "Mind-Bending",
];

const LANGUAGES = [
  "Any Language",
  "English",
  "Hindi",
  "Korean",
  "Japanese",
  "Spanish",
];

function FilterSelect({ options }) {
  return (
    <div className="relative">
      <select
        defaultValue={options[0]}
        className="appearance-none rounded-full border border-cm-line bg-cm-bgAlt py-2.5 pl-3.5 pr-8 text-[13px] text-cm-text outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cm-muted"
      />
    </div>
  );
}

export default function FilterBar({ username = "Ayush" }) {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const movies = await searchMovies(query);

      navigate("/recommend", {
        state: {
          search: query,
          movies,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative z-10 mx-4 sm:mx-auto mb-10 -mt-[50px] sm:-mt-16 max-w-[920px] rounded-[14px] border border-cm-line bg-cm-surface p-[18px] sm:p-[26px] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

      <p className="font-display mb-3.5 text-2xl sm:text-[26px] text-cm-text">
        Hi, <span className="text-cm-purple">{username}</span>
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        <FilterSelect options={GENRES} />
        <FilterSelect options={MOODS} />
        <FilterSelect options={LANGUAGES} />
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 rounded-xl border border-cm-line bg-cm-bgAlt p-2"
      >
        <Search size={18} className="text-cm-muted" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any movie..."
          className="flex-1 bg-transparent outline-none text-white"
        />

        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-5 py-2 font-semibold hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}