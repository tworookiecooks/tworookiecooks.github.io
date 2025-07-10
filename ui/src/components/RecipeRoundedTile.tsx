import { Recipe } from "@/models/Recipe";
import { geistSans, geistMono } from "@/pages";
import Link from "next/link";

type Props = {
  recipe: Recipe;
  imageClassnames: string;
};

const RecipeRoundedTile = ({ recipe, imageClassnames }: Props) => {
  var title = recipe.title.toLowerCase();
  title = title.replaceAll(" ", "-");

  return (
    <Link as={`/recipes/${title}`} href="/recipes/${imagePath}">
      <div
        className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)] hover:scale-105 transition-transform duration-500`}
      >
        <div className="relative space-y-4 sm:space-y-5 md:space-y-5">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl text-white font-bold ">
            {recipe.title}
          </span>
          <img
            src={`/assets/recipe/${title}/cover.webp`}
            alt={recipe.title}
            className={`rounded-lg sm:object-cover w-full h-full ${imageClassnames}`}
          />
        </div>
      </div>
    </Link>
  );
};

export default RecipeRoundedTile;
