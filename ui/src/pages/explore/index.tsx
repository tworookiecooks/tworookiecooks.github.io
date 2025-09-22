import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import RecipeCarousel from "@/components/RecipeCarousel";
import RecipeSubheading from "@/components/RecipeSubheading";
import RecipeTitle from "@/components/RecipeTitle";
import { useRecipes } from "@/context/RecipesContext";
import React from "react";

function Explore() {
  const { recipes } = useRecipes();
  // Get 10 most recently added recipes
  var sortByDate = [...recipes];
  sortByDate.sort((a, b) => {
    if (a.publishedDate != null) {
      return a.publishedDate?._seconds > b.publishedDate?._seconds ? -1 : 1;
    }
    return 1;
  });
  sortByDate = sortByDate.slice(0, 10);

  return (
    <>
      <Container recipes={recipes}>
        <RecipeTitle>What's on the menu?</RecipeTitle>
        <RecipeSubheading>New Recipes</RecipeSubheading>
        <RecipeCarousel recipes={sortByDate} />

        <RecipeSubheading>All Recipes</RecipeSubheading>
        <RecipeCarousel recipes={recipes} />

        {/* <RecipeSubheading>Quick Recipes</RecipeSubheading>
        <RecipeCarousel recipes={recipes} /> */}
      </Container>
      <Footer />
    </>
  );
}

export default Explore;
