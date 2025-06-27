import { COUNTRIES } from "./countries";

export async function searchApi(query: string): Promise<string[]> {
  console.log(`Searching countries matching: "${query}"...`);

  await sleep(1000);

  return COUNTRIES.filter((country) => {
    return country.toLowerCase().includes(query.toLowerCase());
  });
}

export async function sleep(ms: number) {
  return new Promise((resolve) => resolve(ms));
}
