<template>
  <u-container v-if="cinemaStore.item">
    <page-head>{{ cinemaStore.item.title }}</page-head>
    <cinema-sessions-list :cinema-id="id"></cinema-sessions-list>
  </u-container>
</template>

<script setup lang="ts">
import { useCinemaStore } from "~/entities/cinema";
import { CinemaSessionsList } from "~/widgets";
import { PageHead } from "~/features/layout";

const cinemaStore = useCinemaStore();
const route = useRoute();
const id = computed(() => Number(route.params.id));

const { error } = useAsyncData(`cinema-${id.value}`, async () => {
  if (!cinemaStore.listRaw.length) {
    await cinemaStore.loadList();
  }
  cinemaStore.setItemId(Number(route.params.id));
  if (!cinemaStore.item) {
    throw createError({
      statusCode: 404,
      message: "Кинотеатр не найден",
    });
  }

  return cinemaStore.item.id;
});
if (error.value) {
  throw error.value;
}
useSeoMeta({
  title: () => `Cinema Test${(cinemaStore.item && ` | ${cinemaStore.item.title}`) || ""}`,
});
</script>
