import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Recipe } from "@/models/Recipe";
import axios from "axios";

interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children, initialRecipes }: { children: ReactNode; initialRecipes?: Recipe[] }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes || []);

  // On mount, check localStorage for cached recipes
  useEffect(() => {
    const cached = localStorage.getItem("recipes-cache");
    if (cached) {
      setRecipes(JSON.parse(cached));
    } else if (initialRecipes && initialRecipes.length > 0) {
      localStorage.setItem("recipes-cache", JSON.stringify(initialRecipes));
      setRecipes(initialRecipes);
    } else {
      // Fallback: fetch from API if cache and initialRecipes are empty
      axios.get("http://us-central1-two-rookie-cooks.cloudfunctions.net/getRecipes")
        .then((response) => {
          setRecipes(response.data);
          localStorage.setItem("recipes-cache", JSON.stringify(response.data));
        });
    }
  }, [initialRecipes]);

  // Update cache when recipes change
  useEffect(() => {
    if (recipes && recipes.length > 0) {
      localStorage.setItem("recipes-cache", JSON.stringify(recipes));
    }
  }, [recipes]);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
