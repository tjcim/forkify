import "regenerator-runtime/runtime";

export async function getJSON(url) {
  let data;
  let result;
  try {
    result = await fetch(url);
    data = await result.json();
  } catch (err) {
    console.log(err);
  }
  if (result.status !== 200) {
    throw new Error(`${data.message} (${result.status})`);
  }
  return data;
}
