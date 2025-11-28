export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  return {
    provide: {
      appConfig: {
        apiBaseUrl: runtimeConfig.public.apiBaseUrl,
        imagesBaseUrl: runtimeConfig.public.imagesBaseUrl,
        authorizedRoutesNames: ["profile-booking"],
        unauthorizedRoutesNames: ["login", "register"],
      },
    },
  };
});
