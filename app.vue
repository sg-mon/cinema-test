<template>
  <nuxt-layout>
    <u-app>
      <nuxt-page></nuxt-page>
    </u-app>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { useLayoutModule } from "~/features/layout";
import { useConfig, config } from "~/shared";

const layoutModule = useLayoutModule();
const { data } = await useAsyncData("config", () =>
  layoutModule.loadLocalConfig().then(async (result) => {
    useConfig().set(result || {});
    return unref(config);
  }),
);
if (import.meta.client && data.value) {
  useConfig().set(data.value);
}
</script>
