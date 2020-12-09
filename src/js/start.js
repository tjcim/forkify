import { recipeView } from "./views/recipeView.js";

const init = function () {
  recipeView.init();
  recipeView.addHandlerRender(loadId);
};
init();
