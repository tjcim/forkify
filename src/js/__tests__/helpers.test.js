import * as helpers from "../helpers.js";
import * as apiResponse from "../__fixtures__/apiResponse.js";

describe("getJSON", () => {
  test("gets json of valid id", async () => {
    fetch.mockResponseOnce(
      JSON.stringify(apiResponse.id_5ed6604591c37cdc054bca85)
    );
    const url =
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca85";
    const receivedJson = await helpers.getJSON(url);
    expect(fetch).toHaveBeenCalledTimes(1);
    await expect(receivedJson).toStrictEqual(
      apiResponse.id_5ed6604591c37cdc054bca85
    );
  });
});
