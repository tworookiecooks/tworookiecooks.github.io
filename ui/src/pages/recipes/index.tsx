import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import RecipeTile from "@/components/RecipeTile";
import RecipeTitle from "@/components/RecipeTitle";
import { useRecipes } from "@/context/RecipesContext";
import React from "react";

function RecipeCatalogue() {
  const { recipes } = useRecipes();
  return (
    <>
      <NavBar recipes={recipes} />
      <div className="p-10 tracking-tighter leading-tight bg-background">
        <RecipeTitle>All Recipes</RecipeTitle>
        <div className="container mx-auto px-8 xl:px-20 max-w-7xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {recipes.map((recipe) => (
              <RecipeTile recipe={recipe} imageWidth={600} imageHeight={450} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecipeCatalogue;
