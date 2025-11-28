import { defineStore } from "pinia";
import { isAPIError, STORES, type TLocalConfig } from "~/shared";
import { useUserStore } from "~/entities/user";
import { type TLayoutConfig, useLayoutAPI } from "~/features/layout";

export const useLayoutModule = defineStore(STORES.LAYOUT, () => {
  const toast = useToast();

  const userStore = useUserStore();
  const menu = computed(() => [
    {
      label: "Фильмы",
      to: "/",
    },
    {
      label: "Кинотеатры",
      to: "/cinemas",
    },
    {
      label: "Мои билеты",
      to: "/profile/booking",
      disabled: !userStore.isAuth,
    },
    {
      label: userStore.isAuth ? "Выход" : "Вход",
      to: userStore.isAuth ? "" : "/login",
      name: userStore.isAuth ? "logout" : "login",
    },
  ]);

  const { fetchConfig, fetchLocalConfig } = useLayoutAPI();

  const config = ref<TLayoutConfig>({ bookingPaymentTimeSeconds: 0 });
  async function loadLocalConfig() {
    try {
      const response: TLocalConfig = await fetchLocalConfig();
      return response || {};
    } catch (err) {
      console.error("error", err);
      return false;
    }
  }

  return {
    menu,

    config,
    loadLocalConfig,
  };
});
