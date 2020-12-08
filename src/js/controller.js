import "core-js/stable";
import "regenerator-runtime/runtime";

import { state } from "./model.js";
import { RecipeView } from "./views/recipeView.js";

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

export async function controlRecipes(id) {
  const recipeView = new RecipeView();
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

[("hashchange", "load")].forEach((ev) => window.addEventListener(ev, loadId));
