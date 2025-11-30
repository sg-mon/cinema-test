import { defineStore } from "pinia";
import { isAPIError, STORES, useConfig, type APIError } from "~/shared";
import { type TUserTAuthFields, useUserAPI } from "~/entities/user";

export const useUserStore = defineStore(STORES.USER, () => {
  const toast = useToast();

  const config = useConfig();

  const { authorize, registerUser } = useUserAPI();

  const accessToken = useCookie("accessToken");
  const isAuth = computed(() => !!accessToken.value);

  const itemRaw = ref(null);
  const item = computed(() => itemRaw.value);
  const loading = reactive({
    login: false,
    register: false,
  });

  function saveToken(token: string) {
    accessToken.value = token;
  }

  async function login(data: TUserTAuthFields) {
    try {
      loading.login = true;
      const response = await authorize(data);
      saveToken(response.token);
      loading.login = false;
      return true;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Неверный логин или пароль. Проверьте введенные данные и попробуйте снова",
        color: "error",
      });
      console.error("error", err);
      loading.login = false;
      return false;
    }
  }

  async function register(data: TUserTAuthFields) {
    try {
      loading.register = true;
      const response = await registerUser(data);
      saveToken(response.token);
      loading.register = false;
      return true;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err) ? err.data.message : "Ошибка регистрации, попробуйте позже",
        color: "error",
      });
      console.error("error", err);
      loading.register = false;
      return false;
    }
  }

  const route = useRoute();
  const router = useRouter();
  function logout() {
    accessToken.value = "";
    if (config.get("authorizedRoutesNames").includes(String(route.name))) {
      router.push("/");
    }
  }

  return {
    loading,

    isAuth,
    itemRaw,
    item,

    login,
    register,

    logout,
  };
});
