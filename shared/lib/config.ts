import type { TAppConfig } from "~/shared";

export const config = reactive<TAppConfig>({
  authorizedRoutesNames: ["profile-booking"],
  unauthorizedRoutesNames: ["login", "register"],
  apiBaseUrl: "",
  imagesBaseUrl: "",
  bookingPaymentTimeSeconds: 0,
});

export function useConfig() {
  function set(values: Partial<TAppConfig>) {
    if (typeof values.apiBaseUrl !== "undefined") {
      config.apiBaseUrl = values.apiBaseUrl;
    }
    if (typeof values.imagesBaseUrl !== "undefined") {
      config.imagesBaseUrl = values.imagesBaseUrl;
    }
    if (typeof values.authorizedRoutesNames !== "undefined") {
      config.authorizedRoutesNames = values.authorizedRoutesNames;
    }
    if (typeof values.unauthorizedRoutesNames !== "undefined") {
      config.unauthorizedRoutesNames = values.unauthorizedRoutesNames;
    }
    if (typeof values.bookingPaymentTimeSeconds !== "undefined") {
      config.bookingPaymentTimeSeconds = values.bookingPaymentTimeSeconds;
    }
  }

  function get<K extends keyof TAppConfig>(key: K) {
    return config[key];
  }

  return { set, get };
}
