import type { Country } from "../types/Country";

const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/all?fields=name,flags,cca3,capital,region,subregion,population,languages,currencies`);
  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }
  return res.json();
}

export async function searchCountries(query: string): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/name/${query}`);
  if (!res.ok) {
    throw new Error("Failed to search countries");
  }
  return res.json();
}

export async function getCountryByCode(code: string): Promise<Country> {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!res.ok) {
    throw new Error("Failed to fetch country");
  }
  const data: Country[] = await res.json();
  return data[0];
}