import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import RecipeTile from "@/components/RecipeTile";
import RecipeTitle from "@/components/RecipeTitle";
import { Recipe } from "@/models/Recipe";
import axios from "axios";
import React from "react";

type Props = {
  recipes: Recipe[];
};

function RecipeCatalogue({ recipes }: Props) {
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

export const getStaticProps = async () => {
  const recipes = await axios.get(
    `http://us-central1-two-rookie-cooks.cloudfunctions.net/getRecipes`
  );

  return {
    props: {
      recipes: recipes.data
    },
  };
};
