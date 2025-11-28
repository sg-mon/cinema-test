export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const appConfig = await $fetch(`${config.public.apiBaseUrl}/settings`);
  return {
    apiBaseUrl: config.public.apiBaseUrl,
    imagesBaseUrl: config.public.imagesBaseUrl,
    ...(appConfig || {}),
  };
});
