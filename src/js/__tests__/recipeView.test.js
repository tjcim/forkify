import "core-js/stable";
import "regenerator-runtime/runtime";
import * as rv from "../views/recipeView.js";
import * as formattedRecipe from "../__fixtures__/formattedRecipe.js";
import * as recipes from "../__fixtures__/recipes.js";
import * as ingredients from "../__fixtures__/ingredients.js";
import * as formattedIngredients from "../__fixtures__/formattedIngredients.js";

describe("fixFractions", () => {
  test("0.33", () => {
    const received = rv.fixFractions(0.33);
    expect(received).toBe("1/3");
  });
  test("0.25", () => {
    const received = rv.fixFractions(0.25);
    expect(received).toBe("1/4");
  });
});

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
    recipeView = new rv.RecipeView();
  });
  test("renders a recipe", () => {
    // const recipeView = new RecipeView.RecipeView();
    recipeView.renderRecipe(recipes.recipe_1);
    const recipeHtml = document.querySelector(".recipe").innerHTML;
    expect(recipeHtml).toBe(formattedRecipe.formattedRecipe_1);
  });
  test("render the spinner", () => {
    recipeView.renderSpinner();
    const spinnerHTML = document.querySelector(".recipe").innerHTML;
    expect(spinnerHTML).toMatch(new RegExp('class="spinner"'));
  });
  test("generate markup one quarter", () => {
    const received = recipeView.generateMarkupIngredient(
      ingredients.oneQuarter
    );
    expect(received).toBe(formattedIngredients.oneQuarter);
  });
  test("generate markup one third", () => {
    const received = recipeView.generateMarkupIngredient(ingredients.oneThird);
    expect(received).toBe(formattedIngredients.oneThird);
  });
  test("generate markup no unit", () => {
    const received = recipeView.generateMarkupIngredient(ingredients.noUnit);
    expect(received).toBe(formattedIngredients.noUnit);
  });
});
