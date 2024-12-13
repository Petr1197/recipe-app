// components/RecipeCard.tsx
import Image from "next/image";

type Recipe = {
  recipe: {
    label: string;
    image: string;
    url: string;
    source: string;
  };
};

export default function RecipeCard({ recipe }: Recipe) {
  return (
    <div className="max-w-[350px] relative">
      <a href={recipe.url}>
        <Image
          src={recipe.image}
          alt={recipe.label}
          width={350}
          height={350}
        />
        <div className="px-4 py-2 absolute bottom-0 left-0 right-0 text-white bg-gray-600 bg-opacity-70">
          <h3 className="font-bold text-xl">{recipe.label}</h3>
          <p className="text-lg">- {recipe.source}</p>
        </div>
      </a>
    </div>
  );
}
