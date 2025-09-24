"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecipeTags = exports.getRecipes = exports.getRecipeIds = exports.postRecipeFromYaml = exports.getRecipe = void 0;
const https_1 = require("firebase-functions/v2/https");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const yaml = __importStar(require("js-yaml"));
(0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
const db = (0, firestore_1.getFirestore)();
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage({
//   projectId: "two-rookie-cooks",
//   keyFileName: "two-rookie-cooks-SA-key.json"
// });
// const storage = new Storage();
exports.getRecipe = (0, https_1.onRequest)(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        response.status(204).send("");
        return;
    }
    const recipeName = request.query.recipeName?.toString() ?? "unknown";
    const recipeRef = db.collection("recipes").doc(recipeName);
    const doc = await recipeRef.get();
    if (!doc.exists) {
        console.log("No such document!");
        response.sendStatus(404);
    }
    const recipe = doc.data();
    recipe.id = doc.id;
    response.send(recipe);
});
exports.postRecipeFromYaml = (0, https_1.onRequest)(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        response.status(204).send("");
        return;
    }
    const yamlData = request.body;
    const jsonData = yaml.load(yamlData);
    const removeUnusedFields = Object.fromEntries(Object.entries(jsonData).filter(([key]) => !["ogImage", "coverImage"].includes(key)));
    const filteredData = Object.fromEntries(Object.entries(removeUnusedFields).map(([key, value]) => {
        if (key === "content") {
            const paragraphContent = typeof value === "string" ? value.trim() : "";
            return ["description", [{ type: "p", content: paragraphContent }]];
        }
        else if (key === "excerpt") {
            return ["shortDescription", value];
        }
        else if (key === "date") {
            return ["publishedDate", value];
        }
        else {
            return [key, value];
        }
    }));
    const recipe = filteredData;
    let title = recipe.title.toLowerCase();
    title = title.replaceAll(" ", "-");
    const recipeRef = db.collection("recipes").doc(title);
    await recipeRef.set(recipe, { merge: true });
    response.status(200).json(filteredData);
});
exports.getRecipeIds = (0, https_1.onRequest)(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        response.status(204).send("");
        return;
    }
    const recipes = db.collection("recipes").get();
    const titles = [];
    (await recipes).forEach((doc) => {
        titles.push(doc.id);
    });
    response.send(titles);
});
exports.getRecipes = (0, https_1.onRequest)(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        response.status(204).send("");
        return;
    }
    const recipes = db.collection("recipes").get();
    const docs = [];
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
        });
    });
    response.send(docs);
});
exports.addRecipeTags = (0, https_1.onRequest)(async (request, response) => {
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
//# sourceMappingURL=index.js.map