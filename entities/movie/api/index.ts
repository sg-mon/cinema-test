import type { TMovieAPIItem } from "~/entities/movie";
import { apiFetch, useConfig } from "~/shared";

export function useMovieAPI() {
  async function fetchList(): Promise<TMovieAPIItem[]> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/movies`);
  }

  return {
    fetchList,
  };
}
