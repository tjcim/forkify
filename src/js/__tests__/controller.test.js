// import * as controller from "../controller.js";
import * as formattedRecipe from "../__fixtures__/formattedRecipe.js";
import * as apiResponse from "../__fixtures__/apiResponse.js";

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
const controller = require("../controller.js");

beforeEach(() => {
  fetch.resetMocks();
});

describe("Controller", () => {
  test("renders a recipe", async () => {
    fetch.mockResponseOnce(
      JSON.stringify(apiResponse.id_5ed6604591c37cdc054bca85)
    );
    await controller.controlRecipes("5ed6604591c37cdc054bca85");
    const recipeHtml = document.querySelector(".recipe").innerHTML;
    expect(fetch).toHaveBeenCalledTimes(1);
    await expect(recipeHtml).toBe(
      formattedRecipe.formattedRecipe_5ed6604591c37cdc054bca85
    );
  });
});
