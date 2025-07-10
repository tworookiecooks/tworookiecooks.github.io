export interface Recipe {
    id: string;
    title: string;
    publishedDate: Date; 
    shortDescription: string; 
    description: Description[];
    ingredientLists: IngredientList[];
    method: string[];
    iframeUrl: string;
}

export interface IngredientList {
    title?: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string; 
    quantity?: IngredientQuantity
    notes?: string;
    subrecipe?: string[];
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