import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";
import { useUserStore } from "~/entities/user";
import { useConfig } from "~/shared";

export async function apiFetch<T>(
  url: string,
  opts?: NitroFetchOptions<NitroFetchRequest>,
): Promise<T> {
  const route = useRoute();
  const config = useConfig();

  try {
    return await $fetch<T>(url, opts);
  } catch (err: any) {
    if (err?.response?.status === 401) {
      const userStore = useUserStore();
      userStore.logout();

      navigateTo({ name: config.get("unauthorizedRoutesNames")[0] });
    }
    throw err;
  }
}
