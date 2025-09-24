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

  useEffect(() => {
    if (initialRecipes && initialRecipes.length > 0) {
      setRecipes(initialRecipes);
    } else {
      // Fetch from API if no initialRecipes
      axios.get("https://us-central1-two-rookie-cooks.cloudfunctions.net/getRecipes")
        .then((res) => {
          setRecipes(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch recipes:", err);
        });
    }
  }, [initialRecipes]);

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
