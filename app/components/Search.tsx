"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between gap-1 border p-2 rounded-xl bg-white min-w-[300px]"
    >
      <input
        className="w-full focus:outline-none"
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Search for recipe.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="text-xl" type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
