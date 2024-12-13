// app/page.tsx
"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";
// import Search from "./components/Search";
import Pantry from "./components/Pantry";
import RecipeCard from "./components/RecipeCard";

type Recipe = {
  recipe: {
    label: string;
    image: string;
    url: string;
    source: string;
  };
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchEntry, setSearchEntry] = useState("");

  let timeoutId: NodeJS.Timeout;

  const handleSearch = async (query: string) => {
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setRecipes(data);
  };

  const handleSearchWithPantry = async (pantryItems: string[]) => {
    const query = pantryItems.join(",");
    await handleSearch(query);
  };

  const autoSearch = async (searchQuery: string) => {
    setSearchEntry(searchQuery);
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      handleSearch(searchEntry);
    }, 1000);
  };

  useEffect(() => {
    // Optional: clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="main px-6">
      <header className="p-4">
        <ul className="flex justify-around">
          <li>
            {/* <Search onSearch={handleSearch} /> */}
            <input
              className="w-full focus:outline-none"
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="Search for recipe.."
              value={searchEntry}
              onChange={(e) => autoSearch(e.target.value)}
            />
          </li>
        </ul>
      </header>
      <h1 className="font-bold text-2xl text-center">Recipes</h1>
      <main className="">
        <div>
          <Pantry onSearchWithPantry={handleSearchWithPantry} />
        </div>
        <div className="flex flex-wrap gap-12 justify-center">
          {recipes.length > 0 ? (
            recipes.map((recipeData, index) => (
              <RecipeCard key={index} recipe={recipeData.recipe} />
              // <div className="max-w-[350px] relative" key={index}>
              //   <a href={recipeData.recipe.url}>
              //     <Image
              //       src={recipeData.recipe.image}
              //       alt={recipeData.recipe.label}
              //       width={350}
              //       height={350}
              //     />
              //     <div className="px-4 py-2 absolute bottom-0 left-0 right-0 text-white bg-gray-600 bg-opacity-70">
              //       <h3 className="font-bold text-xl">
              //         {recipeData.recipe.label}
              //       </h3>
              //       <p className="text-lg">- {recipeData.recipe.source}</p>
              //     </div>
              //   </a>
              // </div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
