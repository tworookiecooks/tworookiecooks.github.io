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

export default function RecipeDisplay({ recipes, recipeId }: { recipes: Recipe[]; recipeId: string }) {
  const router = useRouter();
  const recipe = recipes.find((recipe) => recipe.id === recipeId) as Recipe;
  const title = recipe?.title || "";
  // State to track which subrecipe is expanded
  const [expandedSubrecipeId, setExpandedSubrecipeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  // Only show 404 if recipe is not found
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

export async function getStaticPaths() {
  // List of all recipe slugs from the public/assets/recipe directory
  const slugs = [
    "20-minute-laksa",
    "air-fried-chickpeas",
    "air-fried-pasta-chips",
    "air-fried-tteokboki",
    "air-fried-tteokboki-(sweet)",
    "army-stew",
    "asian-inspired-meatballs",
    "avocado-pasta",
    "baked-haloumi-meatballs",
    "banana-bread",
    "banana-cinnamon-scrolls",
    "banana-pancakes",
    "beef-bulgogi",
    "beef-noodle-soup",
    "black-pepper-beef",
    "blueberry-banana-muffin",
    "bolognese-pies",
    "breakfast-roti-wrap",
    "caramelised-onion-dip",
    "cauliflower-pasta",
    "char-siu",
    "cheeseburger-dumplings",
    "chicken-and-prawn-soup",
    "chicken-curry",
    "chorizo-rice",
    "chrysanthemum-chia-seed-pudding",
    "creamy-garlic-prawns",
    "creamy-kimchi-pasta",
    "creamy-miso-udon",
    "creamy-tuscan-salmon",
    "deep-dish-pastry",
    "diy-pepper-lunch",
    "dumpling-dough",
    "egg-drop-soup",
    "enoki-and-beef-don",
    "finnish-salmon-soup",
    "five-spice-chicken-nuggets",
    "french-onion-soup-pasta",
    "garlic-butter-prawn-dumplings",
    "garlic-confit",
    "garlic-soy-beef-meatballs",
    "garlic-stracciatella-cheese",
    "garlicky-bread-bites",
    "gochujang-bolognese",
    "gochujang-bolognese-udon",
    "granola",
    "half-boiled-eggs",
    "honey-and-cranberry-cookies",
    "honey-soy-chicken",
    "hot-honey-miso-toastie",
    "jjajangmyeon",
    "jjolmyeon",
    "kimchi-dumplings",
    "kimchi-fried-rice",
    "kimchi-pancakes",
    "kimchi-udon",
    "lamb-&-feta-meatballs",
    "lasagne-soup",
    "leek-toastie",
    "loh-mai-gai",
    "mango-sticky-rice",
    "matcha-&-white-chocolate-cookies",
    "mini-broccoli-quiches",
    "miso-fish",
    "miso-fried-prawns",
    "miso-honey-tofu",
    "miso-mac-and-cheese",
    "miso-soup-dumplings",
    "miso-yoghurt-pasta",
    "mixed-berry-jam",
    "mochi",
    "mushroom-pastries",
    "okonomiyaki",
    "oreo-cheesecake",
    "oyakodon",
    "pan-fried-chicken-thighs",
    "pan-fried-rice-paper-rolls",
    "pb&j-rolls",
    "peanut-butter-granola",
    "pork-dumplings",
    "pork-mince-japanese-curry",
    "ramen-eggs",
    "rose-tteokboki",
    "salmon-and-egg-rice",
    "salmon-bucatini",
    "salmon-inari",
    "sausage-bolognese",
    "scissor-cut-noodles",
    "seaweed-scrambled-eggs",
    "shin-ramen-carbonara",
    "shin-ramen-x-chapagetti",
    "silken-tofu-pasta-sauce",
    "soy-sauce-chicken-rice",
    "spare-rib-soup",
    "spicy-eggs",
    "spicy-tofu",
    "stir-fried-noodles",
    "sundried-tomato-pesto",
    "sundried-tomato-pesto-pasta",
    "sundried-tomato-pesto-toastie",
    "sushi-bake",
    "taco-bowl",
    "taco-pasta",
    "tahini-noodles",
    "thai-basil-beef",
    "tofu-fries",
    "tomato-scrambled-eggs",
    "tortillas",
    "viral-feta-eggs",
    "vodka-pasta",
    "zucchini-slice",
  ];

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  // Fetch all recipes at build time
  const response = await axios.get("http://us-central1-two-rookie-cooks.cloudfunctions.net/getRecipes");
  const recipes: Recipe[] = response.data;
  const recipeId = params.slug;
  // Find the recipe matching the slug
  // const recipe = recipes.find((r: Recipe) => r.id === recipeId);

  return {
    props: {
      recipes,
      recipeId,
    },
  };
}
