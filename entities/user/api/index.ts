import type { TUserTAuthFields, TUserTAuthResponse } from "~/entities/user";
import { apiFetch, useConfig } from "~/shared";

export function useUserAPI() {
  async function authorize(data: TUserTAuthFields): Promise<TUserTAuthResponse> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function registerUser(data: TUserTAuthFields): Promise<TUserTAuthResponse> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return { authorize, registerUser };
}
