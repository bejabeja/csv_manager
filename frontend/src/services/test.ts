import { API_HOST } from "../config";
import { type ApiSearchResponse } from "../types";

if (!API_HOST) {
  throw new Error("API_HOST is not defined");
}

export const testData = async (): Promise<ApiSearchResponse> => {
  const res = await fetch(`${API_HOST}/api/hello`);

  if (!res.ok) {
    throw new Error(`Error searching data: ${res.statusText}`);
  }

  const json = (await res.json()) as ApiSearchResponse;

  if (!json || typeof json !== "object") {
    throw new Error("Invalid API response");
  }

  return json;
};
