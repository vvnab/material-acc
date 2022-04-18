// @ts-ignore
const customFetch = async (
  url: string,
  bearer: string,
  method: string,
  body?: any
) => {
  const result = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
    body: JSON.stringify(body),
  });
  const data = await result.json();
  return data;
};

export default customFetch;
