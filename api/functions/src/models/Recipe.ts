export interface Recipe {
    title: string;
    publishedDate: Date;
    shortDescription: string;
    longDescription: string;
    description: Description[];
    ingredientLists: IngredientList[];
    method: string[];
    iframeUrl: string;
    id: string;
}

export interface IngredientList {
    title?: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    quantity?: IngredientQuantity
    notes?: string;
}

export interface IngredientQuantity {
    amount: number;
    unit: string;
}

export interface Description {
    type: string;
    content: string;
    items: string[];
}
