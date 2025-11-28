import type { TSessionAPIListItem, TSessionAPIItem } from "~/entities/session";
import { apiFetch, useConfig, type TLocalConfig } from "~/shared";
import type { TLayoutConfig } from "~/features/layout";

export function useLayoutAPI() {
  async function fetchConfig(): Promise<TLayoutConfig> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/settings`);
  }

  async function fetchLocalConfig(): Promise<TLocalConfig> {
    return await $fetch("/api/config");
  }

  return {
    fetchConfig,
    fetchLocalConfig,
  };
}
