import * as config from "./config.js";

export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  let result;
  let data;
  try {
    result = await fetch(`${config.API_URL}/${id}`);
    data = await result.json();
  } catch (e) {
    console.log(e);
  }

  if (result.status !== 200) {
    throw new Error(`${data.message} (${result.status})`);
  }

  const { recipe } = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };
}
