import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "../../img/icons.svg";
import { Fraction } from "fractional";

export function fixFractions(quantity) {
  let result = new Fraction(quantity).toString();
  if (result === "33/100") {
    result = "1/3";
  }
  return result;
}

// I export both the class and an instance of the class.
// The class is exported for testing. Otherwise the document would have no html when I tried to test
// The instnce is exported for the application normal processing.
export class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  render(markup) {
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderRecipe(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.render(markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.render(markup);
  }

  addHandlerRender(handler) {
    [("hashchange", "load")].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  #generateMarkup() {
    // prettier-ignore
    return `
  <figure class="recipe__fig">
    <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img">
    <h1 class="recipe__title">
      <span>${this.#data.title}</span>
    </h1>
  </figure>
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.#data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.#data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">${this.#data.ingredients .map(this.generateMarkupIngredient).join("")}
    </ul>
  </div>
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.#data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a class="btn--small recipe__btn" href="${this.#data.sourceUrl}" target="_blank">
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? fixFractions(ing.quantity) : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
  }
}

export const recipeView = new RecipeView();
