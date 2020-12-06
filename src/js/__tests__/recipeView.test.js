import "core-js/stable";
import "regenerator-runtime/runtime";
import * as RecipeView from "../views/recipeView.js";
import * as formattedRecipe from "../__fixtures__/formattedRecipe.js";
import * as recipes from "../__fixtures__/recipes.js";

describe("Recipe View Class", () => {
  let recipeView;
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="/icons.002645bd.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      </div>
      `;
    recipeView = new RecipeView.RecipeView();
  });
  test("renders a recipe", () => {
    // const recipeView = new RecipeView.RecipeView();
    recipeView.render(recipes.recipe_5ed6604591c37cdc054bca85);
    const recipeHtml = document.querySelector(".recipe").innerHTML;
    expect(recipeHtml).toBe(
      formattedRecipe.formattedRecipe_5ed6604591c37cdc054bca85
    );
  });
  test("render the spinner", () => {
    recipeView.renderSpinner();
    expect(recipeHtml).toBe(`
        <div class="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div>`);
  });
});
