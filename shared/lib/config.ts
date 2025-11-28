import type { TAppConfig } from "~/shared";

export const config = ref<Partial<TAppConfig>>({
  authorizedRoutesNames: ["profile-booking"],
  unauthorizedRoutesNames: ["login", "register"],
});
export function useConfig() {
  function set(val: Partial<TAppConfig>) {
    config.value = val;
  }
  function get(configProperty: keyof TAppConfig) {
    return config.value[configProperty];
  }

  return {
    set,
    get,
  };
}
