import { API_HOST } from "../config";
import { Pagination, type ApiSearchResponse, type Data } from "../types";

export const searchData = async (
  search: string,
  page: number = 1,
  limit: number = 10
): Promise<[Error?, Data?, Pagination?]> => {
  try {
    const res = await fetch(
      `${API_HOST}/api/csvdata?q=${search}&page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      return [new Error(`Error searching data: ${res.statusText}`)];
    }

    const json = (await res.json()) as ApiSearchResponse;
    return [undefined, json.data, json.pagination];
  } catch (error) {
    if (error instanceof Error) {
      return [error];
    }

    return [new Error("Unknown error")];
  }
};
