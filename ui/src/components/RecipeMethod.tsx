import { Ingredient, IngredientList, IngredientQuantity } from '@/models/Recipe';

type Props = {
  method: string[]
}

const RecipeMethod = ({ method }: Props) => {
  return (
    <div>
        <h3 id='recipe'>Method</h3>
        <ol>
        {method.map((step, i) => (
            <li key={i}>{step}</li>
        ))}
        </ol>
    </div>
  );
}

export default RecipeMethod