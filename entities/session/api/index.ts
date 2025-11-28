import type { TSessionAPIListItem, TSessionAPIItem } from "~/entities/session";
import { apiFetch, useConfig } from "~/shared";

export function useSessionAPI() {
  async function fetchListByMovieId(movieId: number): Promise<TSessionAPIListItem[]> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/movies/${movieId}/sessions`);
  }

  async function fetchListByCinemaId(cinemaId: number): Promise<TSessionAPIListItem[]> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/cinemas/${cinemaId}/sessions`);
  }

  async function fetchItem(movieSessionId: number): Promise<TSessionAPIItem[]> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/movieSessions/${movieSessionId}`);
  }

  return {
    fetchListByMovieId,
    fetchListByCinemaId,
    fetchItem,
  };
}
