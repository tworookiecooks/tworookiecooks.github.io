import { Ingredient, Quantity } from "@/interfaces/recipes";

type Props = {
  content: string;
  excerpt: string;
  method: string[];
  ingredients: Ingredient[];
  serves: string;
};

const RecipeBody = ({ content, excerpt, method, ingredients, serves }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Paragraphs paragraphs={excerpt} />
      <Paragraphs paragraphs={content} />
      <p>{serves}</p>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>{getIngredientText(ingredient)}</li>
        ))}
      </ul>

      <h3>Method</h3>
      <ol>
        {method.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

const getIngredientText = (ingredient: Ingredient): string => {
  if (ingredient.overrideText) return ingredient.overrideText;

  let quantityText = ingredient.quantity && getQuantityText(ingredient.quantity)
  let ingredientText = [
    quantityText,
    ingredient.name,
    ingredient.notes,
  ].filter(a => a);
  
  return ingredientText.join(" ")
};

const getQuantityText = (quantity: Quantity): string => {
    let quantityText = quantity.amount;
    if (quantity.unit) {
      ["g", "kg", "L", "ml"].indexOf(quantity.unit) == -1 && (quantityText += " ");
      quantityText += quantity.unit
    }

    return quantityText;
}

export const Paragraphs = ({ paragraphs }: { paragraphs: string }) => (
  <>
    {paragraphs.split("\n").map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </>
);

export default RecipeBody;
