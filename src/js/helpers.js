import "regenerator-runtime/runtime";
import { API_TIMEOUT } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url) {
  let data;
  let result;
  try {
    result = await Promise.race([fetch(url), timeout(API_TIMEOUT)]);
    data = await result.json();
  } catch (err) {
    throw err;
  }
  if (result.status !== 200) {
    throw new Error(`${data.message} (${result.status})`);
  }
  return data;
}
