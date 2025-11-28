import { useUserStore } from "~/entities/user";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const { $appConfig } = useNuxtApp();
  if (!userStore.isAuth) {
    return navigateTo({ name: $appConfig.unauthorizedRoutesNames[0] });
  }
});
