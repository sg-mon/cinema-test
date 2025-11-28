import type { TCinemaAPIItem } from "~/entities/cinema";
import { apiFetch, useConfig } from "~/shared";

export function useCinemaAPI() {
  async function fetchList(): Promise<TCinemaAPIItem[]> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/cinemas`);
  }

  return {
    fetchList,
  };
}
