import { useUserStore } from "~/entities/user";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  if (userStore.isAuth) {
    return navigateTo("/");
  }
});
