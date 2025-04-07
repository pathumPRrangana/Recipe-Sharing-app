import { delay, getData, setData } from "./utils";

export const getAllRecipes = async () => {
  await delay(500);
  return getData("recipes");
};

export const getRecipeById = async (id) => {
  await delay(300);
  const recipes = getData("recipes");
  return recipes.find((r) => r.id === id);
};

export const createRecipe = async (recipe) => {
  await delay(500);
  const recipes = getData("recipes");
  const newRecipe = { ...recipe, id: Date.now().toString() };
  recipes.push(newRecipe);
  setData("recipes", recipes);
  return newRecipe;
};

export const updateRecipe = async (id, updatedData) => {
  await delay(500);
  let recipes = getData("recipes");
  recipes = recipes.map((r) => (r.id === id ? { ...r, ...updatedData } : r));
  setData("recipes", recipes);
  return recipes.find((r) => r.id === id);
};

export const deleteRecipe = async (id) => {
  await delay(400);
  let recipes = getData("recipes");
  recipes = recipes.filter((r) => r.id !== id);
  setData("recipes", recipes);
  return true;
};  
