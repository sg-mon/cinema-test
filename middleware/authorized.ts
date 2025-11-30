import { useUserStore } from "~/entities/user";
import { useConfig } from "~/shared";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const config = useConfig();
  if (!userStore.isAuth) {
    return navigateTo({ name: config.get("unauthorizedRoutesNames")[0] });
  }
});
