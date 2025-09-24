import {onRequest} from "firebase-functions/v2/https";
import {initializeApp, applicationDefault} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import * as yaml from "js-yaml";
import {Recipe} from "./models/Recipe";
initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore();

// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage({
//   projectId: "two-rookie-cooks",
//   keyFileName: "two-rookie-cooks-SA-key.json"
// });
// const storage = new Storage();

export const getRecipe = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }
  const recipeName:string = request.query.recipeName?.toString() ?? "unknown";

  const recipeRef = db.collection("recipes").doc(recipeName);
  const doc = await recipeRef.get();
  if (!doc.exists) {
    console.log("No such document!");
    response.sendStatus(404);
  }

  const recipe = doc.data() as Recipe;
  recipe.id = doc.id;

  response.send(recipe);
});

export const postRecipeFromYaml = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }
  const yamlData = request.body;

  const jsonData: any = yaml.load(yamlData);

  const removeUnusedFields = Object.fromEntries(
    Object.entries(jsonData).filter(([key]) =>
      !["ogImage", "coverImage"].includes(key)
    )
  );

  const filteredData = Object.fromEntries(
    Object.entries(removeUnusedFields).map(([key, value]) => {
      if (key === "content") {
        const paragraphContent = typeof value === "string" ? value.trim() : "";
        return ["description", [{type: "p", content: paragraphContent}]];
      } else if (key === "excerpt") {
        return ["shortDescription", value];
      } else if (key === "date") {
        return ["publishedDate", value];
      } else {
        return [key, value];
      }
    })
  );

  const recipe = filteredData as any as Recipe;

  let title = recipe.title.toLowerCase();
  title = title.replaceAll(" ", "-");
  const recipeRef = db.collection("recipes").doc(title);

  await recipeRef.set(recipe, {merge: true});

  response.status(200).json(filteredData);
});

export const getRecipeIds = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }
  const recipes = db.collection("recipes").get();
  const titles: string[] = [];
  (await recipes).forEach((doc) => {
    titles.push(doc.id);
  });
  response.send(titles);
});

export const getRecipes = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }
  const recipes = db.collection("recipes").get();
  const docs: Recipe[] = [];
  (await recipes).forEach((doc) => {
    const data = doc.data();
    docs.push({
      title: data.title,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      description: data.description,
      publishedDate: data.publishedDate,
      ingredientLists: data.ingredientLists,
      method: data.method,
      serves: data.serves,
      iframeUrl: data.iframeUrl,
      cookingDuo: data.cookingDuo,
      coverImage: data.coverImage,
      ogImage: data.ogImage,
      id: doc.id,
    } as Recipe);
  });
  response.send(docs);
});

export const addRecipeTags = onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }
  const pathSegments = request.path.split("/");

  const recipeName = pathSegments[1];

  const recipeRef = db.collection("recipes").doc(recipeName);
  recipeRef.update({
    tags: request.body.tags,
  });
  response.sendStatus(200);
});
