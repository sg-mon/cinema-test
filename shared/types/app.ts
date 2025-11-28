export const TAppConfigKeys = [
  "apiBaseUrl",
  "imagesBaseUrl",
  "authorizedRoutesNames",
  "unauthorizedRoutesNames",
  "bookingPaymentTimeSeconds",
] as const;

export type TLocalConfig = {
  apiBaseUrl: string;
  imagesBaseUrl: string;
};
export type TAppConfig = TLocalConfig & {
  authorizedRoutesNames: string[];
  unauthorizedRoutesNames: string[];
  bookingPaymentTimeSeconds: number;
};
