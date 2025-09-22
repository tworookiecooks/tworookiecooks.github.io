import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Recipe } from "@/models/Recipe";

interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children, initialRecipes }: { children: ReactNode; initialRecipes?: Recipe[] }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes || []);

  // Only hydrate from initialRecipes (no localStorage or API)
  useEffect(() => {
    if (initialRecipes && initialRecipes.length > 0) {
      setRecipes(initialRecipes);
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
