import Container from "@/components/Container";
import Footer from "@/components/Footer";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeMethod from "@/components/RecipeMethod";
import RecipeTitle from "@/components/RecipeTitle";
import RecipeVideo from "@/components/RecipeVideo";
import Tag from "@/components/Tag";
import { Recipe } from "@/models/Recipe";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecipes } from "@/context/RecipesContext";

export default function RecipeDisplay() {
  const { recipes } = useRecipes();
  const router = useRouter();
  const recipeId = router.query.slug as string;
  const recipe = recipes.find((recipe) => recipe.id === recipeId) as Recipe;
  const title = recipe?.title || "";
  // State to track which subrecipe is expanded
  const [expandedSubrecipeId, setExpandedSubrecipeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  // Show loading if recipes are not loaded yet
  if (!recipes || recipes.length === 0) {
    return <div className="p-10">Loading...</div>;
  }

  // Only show 404 if recipes are loaded and recipe is not found
  if (!router.isFallback && !recipe?.title) {
    return <ErrorPage statusCode={404} />;
  }

  // Callback to expand/collapse a specific subrecipe
  const handleExpandSubrecipeClick = (subrecipeId: string) => {
    setExpandedSubrecipeId((prev) =>
      prev === subrecipeId ? null : subrecipeId
    );
  };

  function getSubrecipesForIngredient(
    recipe: Recipe,
    ingredientName: string
  ): string[] | undefined {
    // Iterate through each ingredient list
    for (const ingredientList of recipe.ingredientLists) {
      // Iterate through each ingredient within the current list
      for (const ingredient of ingredientList.ingredients) {
        // Check if the current ingredient's name matches the target ingredientName
        if (ingredient.name === ingredientName) {
          // If it matches, return its subrecipe array
          // Ensure subrecipe exists and is an array before returning
          if (Array.isArray(ingredient.subrecipe)) {
            return ingredient.subrecipe;
          }
        }
      }
    }
    // If no matching ingredient with a subrecipe was found, return undefined
    return undefined;
  }

  function getMethod(): string[] {
    if (!expandedSubrecipeId) {
      // Only return main recipe steps, filter out subrecipe placeholders
      return recipe.method.filter(
        (m) => typeof m === "string" && !m.startsWith("subrecipe")
      ) as string[];
    }
    // Insert the expanded subrecipe's method steps in place of its placeholder
    return recipe.method.flatMap((m) => {
      if (typeof m === "string" && m.startsWith("subrecipe")) {
        m = m.replace("subrecipe - ", "").trim();
        // Find the subrecipe reference for this placeholder
        const subrecipes = getSubrecipesForIngredient(recipe, m);
        if (subrecipes && subrecipes.includes(expandedSubrecipeId)) {
          const subrecipe = recipes.find((r) => r.id === expandedSubrecipeId);
          return subrecipe?.method || [];
        }
        // If not the expanded subrecipe, skip
        return [];
      }
      return m;
    }) as string[];
  }

  return (
    <>
      <Container recipes={recipes}>
        <div className="p-10">
          <RecipeTitle>{recipe.title}</RecipeTitle>
          {/* Example Tag component above the recipe description */}
          {/* <div className="mb-4">
            <Tag>
              <AccessTimeIcon />
              30 mins
            </Tag>
          </div> */}
          <div className="flex flex-col-reverse md:flex-row">
            <div>
              {recipe.description.map((description, index) => {
                if (description.type === "p") {
                  // Apply white-space: pre-wrap; to this <p> tag if content can have internal newlines
                  const Tag = description.type;

                  return (
                    <Tag
                      key={index}
                      className="recipe-paragraph"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {description.content}
                    </Tag>
                  );
                } else if (description.type === "h3") {
                  const HeadingTag = description.type; // Default to h3 if level not specified
                  return (
                    <HeadingTag key={index}>{description.content}</HeadingTag>
                  );
                } else if (description.type === "list") {
                  return (
                    <ul key={index}>
                      {description.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}

              <br />
              <RecipeIngredients
                ingredientLists={recipe.ingredientLists}
                onExpandSubrecipeClick={handleExpandSubrecipeClick}
                expandedSubrecipeId={expandedSubrecipeId}
                recipes={recipes}
              />
              <br />
              <RecipeMethod method={getMethod()} />
            </div>

            {recipe.iframeUrl && (
              <div className="flex-none pb-8 md:pl-8">
                <RecipeVideo title={title} url={recipe.iframeUrl} />
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
