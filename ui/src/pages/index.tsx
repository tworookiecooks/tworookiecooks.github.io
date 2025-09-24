import NavBar from "../components/Navbar";
import localFont from "next/font/local";
import axios from "axios";
import { Recipe } from "@/models/Recipe";
import RecipeTitle from "@/components/RecipeTitle";
import RecipeRoundedTile from "@/components/RecipeRoundedTile";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import TextButton from "@/components/TextButton";
import { useRecipes } from "@/context/RecipesContext";
import React, { useEffect, useState } from "react";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { recipes } = useRecipes();
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);
  const [randomized, setRandomized] = useState(false);
  const isLoading = !recipes || recipes.length < 5;

  useEffect(() => {
    if (!randomized && recipes && recipes.length >= 5) {
      setTopRecipes(getRandomUniqueItemsIterative(recipes, 5));
      setRandomized(true);
    }
  }, [recipes, randomized]);

  return (
    <>
      <Container recipes={recipes}>
        <RecipeTitle>Two Rookie Cooks</RecipeTitle>
        <div className="flex justify-center ">
          <div className="relative">
            {isLoading ? (
              <div className="text-center py-10 text-lg text-gray-500">
                Loading recipes...
              </div>
            ) : (
              <>
                <div className="sm:flex sm:space-x-4 md:space-x-5 sm:space-y-0">
                  <RecipeRoundedTile
                    recipe={topRecipes[0]}
                    imageClassnames="sm:w-[250px] md:w-[300px] sm:h-[300px]"
                  />
                  <RecipeRoundedTile
                    recipe={topRecipes[1]}
                    imageClassnames="sm:w-[250px] md:w-[300px] lg:w-[600px] sm:h-[300px]"
                  />
                </div>
                <div className="sm:flex sm:space-x-4 md:space-x-5">
                  <RecipeRoundedTile
                    recipe={topRecipes[2]}
                    imageClassnames="sm:w-[250px] md:w-[300px] lg:w-[600px] sm:h-[300px]"
                  />
                  <div className="relative">
                    <RecipeRoundedTile
                      recipe={topRecipes[3]}
                      imageClassnames="sm:w-[250px] md:w-[300px] sm:h-[142px]"
                    />
                    <RecipeRoundedTile
                      recipe={topRecipes[4]}
                      imageClassnames="sm:w-[250px] md:w-[300px] sm:h-[142px]"
                    />
                  </div>
                </div>
                <div className="ml-auto w-fit py-4">
                  <TextButton href="/explore">Explore more →</TextButton>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

function getRandomUniqueItemsIterative<T>(list: T[], count: number): T[] {
  // 1. Create a shallow copy of the list to perform removals on
  const mutableList = [...list];
  const result: T[] = [];

  // 2. Handle edge cases
  if (count <= 0) {
    return [];
  }
  if (count > mutableList.length) {
    // If you need more items than available, return all of them
    // or throw an error depending on your requirements.
    console.warn(
      `Attempted to get ${count} items, but only ${mutableList.length} available. Returning all available items.`
    );
    return mutableList; // Or throw new Error("Not enough items in the list.");
  }

  // 3. Select 'count' unique items
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * mutableList.length);
    // Add the randomly selected item to the result
    result.push(mutableList[randomIndex]);
    // Remove the selected item from the mutable list to prevent re-selection
    mutableList.splice(randomIndex, 1);
  }

  return result;
}
