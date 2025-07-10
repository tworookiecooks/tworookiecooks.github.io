import localFont from "next/font/local";
import { ReactNode } from "react";
import Image from "next/image";
import { Recipe } from "@/models/Recipe";
import { geistSans, geistMono } from "@/pages";
import Link from "next/link";

type Props = {
  recipe: Recipe;
  imageWidth: number; 
  imageHeight: number;
};

const RecipeTile = ({ recipe, imageWidth, imageHeight }: Props) => {
  var title = recipe.title.toLowerCase();
  title = title.replaceAll(" ", "-");

  return (
    <Link as={`/recipes/${title}`} href="/recipes/${imagePath}">
      <div
        className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]`}
      >
        <div className="relative">
          <span className="absolute bottom-4 left-4 text-xl text-white font-bold drop-shadow-2xl">
            {recipe.title}
          </span>
          <Image
            src={`/assets/recipe/${title}/cover.webp`}
            alt={recipe.title}
            width={imageWidth}
            height={imageHeight}
          />
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
