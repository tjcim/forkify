"use strict()";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "../model.js";
import * as apiResponse from "../__fixtures__/apiResponse.js";
import * as recipes from "../__fixtures__/recipes.js";

beforeEach(() => {
  fetch.resetMocks();
});

describe("State class", () => {
  let state;
  beforeEach(() => {
    state = new model.State();
  });
  test("Received valid data", async () => {
    fetch.mockResponseOnce(
      JSON.stringify(apiResponse.id_5ed6604591c37cdc054bca85)
    );
    const res = await state.loadRecipe("5ed6604591c37cdc054bca85");
    expect(state.recipe).toStrictEqual(recipes.recipe_5ed6604591c37cdc054bca85);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("Requested an invalid id", async () => {
    const body = apiResponse.invalid_5ed6604591c37cdc054bca85zzzzz;
    const init = { status: 400, statusText: "Bad Request" };
    fetch.mockResponseOnce(JSON.stringify(body), init);
    await expect(
      state.loadRecipe("5ed6604591c37cdc054bca85zzzzz")
    ).rejects.toThrowError();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
