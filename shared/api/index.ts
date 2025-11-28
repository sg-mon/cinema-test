import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";
import { useUserStore } from "~/entities/user";

export async function apiFetch<T>(
  url: string,
  opts?: NitroFetchOptions<NitroFetchRequest>,
): Promise<T> {
  const route = useRoute();

  try {
    return await $fetch<T>(url, opts);
  } catch (err: any) {
    if (err?.response?.status === 401) {
      const userStore = useUserStore();
      userStore.logout();

      navigateTo({ name: "/login" });
    }
    throw err;
  }
}
