import {
  Ingredient,
  IngredientList,
  IngredientQuantity,
} from "@/models/Recipe";
import TextButton from "./TextButton";

type Props = {
  ingredientLists: IngredientList[];
  onExpandSubrecipeClick: (subrecipeId: string) => void;
  expandedSubrecipeId: string | null;
  recipes: any[];
};

const RecipeIngredients = ({ ingredientLists, onExpandSubrecipeClick, expandedSubrecipeId, recipes }: Props) => {
  const getIngredientText = (
    index: number,
    ingredient: Ingredient
  ): React.ReactNode[] => {
    let parts: React.ReactNode[] = [];

    let quantityText =
      ingredient.quantity && getQuantityText(ingredient.quantity);
    let ingredientText = [quantityText, ingredient.name, ingredient.notes].filter(
      (a) => a
    );

    let subrecipe = ingredient.subrecipe;
    if (subrecipe && subrecipe.length > 0) {
      // Only render the main ingredient as a reference to the subrecipe, not its ingredients
      parts.push(
        <li key={index}>
          {ingredientText.join(" ")}
        </li>
      );
      // Render subrecipe buttons on new lines, not as list items
      parts.push(
        <div key={`subrecipe-buttons-${index}`} className="ml-6 flex flex-col gap-1">
          {subrecipe.map((subId, idx) => {
            const subrecipeObj = recipes.find(r => r.id === subId);
            if (!subrecipeObj) return null;
            const isExpanded = expandedSubrecipeId === subId;
            return (
              <TextButton
                key={subId}
                className="text-text/50 text-left w-fit"
                href="#recipe"
                onClick={() => onExpandSubrecipeClick(subId)}
              >
                {isExpanded ? `Collapse ${subrecipeObj.title} recipe` : `Expand ${subrecipeObj.title} recipe`}
              </TextButton>
            );
          })}
        </div>
      );
      // Do NOT render subrecipe ingredients here
    } else {
      parts.push(<li key={index}>{ingredientText.join(" ")}</li>);
    }

    return parts;
  };

  const getQuantityText = (quantity: IngredientQuantity): string => {
    let quantityText = quantity.amount.toString();
    if (quantity.unit) {
      ["g", "kg", "L", "ml"].indexOf(quantity.unit) == -1 &&
        (quantityText += " ");
      quantityText += quantity.unit;
    }

    return quantityText;
  };

  return (
    <div>
      {ingredientLists.map((ingredientList, i) => (
        <div key={i}>
          <h3>{ingredientList.title ?? "Ingredients"}</h3>
          <ul>
            {ingredientList.ingredients.map((ingredient, ii) =>
              getIngredientText(ii, ingredient)
            )}
          </ul>
        </div>
      ))}
      {/* Render subrecipe ingredient lists as separate lists when expanded */}
      {expandedSubrecipeId && ingredientLists.map((ingredientList) =>
        ingredientList.ingredients.map((ingredient) => {
          if (ingredient.subrecipe && ingredient.subrecipe.length > 0) {
            return ingredient.subrecipe.map((subId: string) => {
              if (expandedSubrecipeId === subId) {
                const subrecipeObj = recipes.find(r => r.id === subId);
                if (subrecipeObj && subrecipeObj.ingredientLists) {
                  return subrecipeObj.ingredientLists.map((subList: IngredientList, idx: number) => (
                    <div key={`subrecipe-list-${subrecipeObj.id}-${idx}`} className="mt-4">
                      <h3>{subList.title || subrecipeObj.title}</h3>
                      <ul>
                        {subList.ingredients.map((ing: Ingredient, iii: number) => (
                          <li key={iii}>{[ing.quantity && getQuantityText(ing.quantity), ing.name, ing.notes].filter(Boolean).join(" ")}</li>
                        ))}
                      </ul>
                    </div>
                  ));
                }
              }
              return null;
            });
          }
          return null;
        })
      )}
    </div>
  );
};

export default RecipeIngredients;


