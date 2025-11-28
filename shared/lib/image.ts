import { useConfig } from "./config";

export function getImagePath(path: string) {
  return `${useConfig().get("imagesBaseUrl")}/${path}`.replace(/([^:]\/)\/+/g, "$1");
}
