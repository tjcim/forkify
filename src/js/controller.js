import "core-js/stable";
import "regenerator-runtime/runtime";

import { state } from "./model.js";
import { recipeView } from "./views/recipeView.js";

export async function controlRecipes(id) {
  // const recipeView = new RecipeView();
  try {
    recipeView.renderSpinner();
    await state.loadRecipe(id);
    recipeView.renderRecipe(state.recipe);
  } catch (err) {
    console.log(err);
  }
}

function loadId() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  controlRecipes(id);
}

// [("hashchange", "load")].forEach((ev) => window.addEventListener(ev, loadId));

function init() {
  recipeView.addHandlerRender(loadId);
}

init();
