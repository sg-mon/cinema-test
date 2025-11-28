<template>
  <u-container v-if="movieStore.item">
    <page-head>{{ movieStore.item?.title }}</page-head>
    <div class="flex gap-4 mb-8">
      <img :src="movieStore.item?.image" :alt="movieStore.item?.title" class="rounded-md h-80" />
      <div>
        <p class="mb-2">
          {{ movieStore.item?.description }}
        </p>
        <p class="text-base flex flex-col">
          <span>Год: {{ movieStore.item?.year }}</span>
          <span>Продолжительность: {{ movieStore.item?.duration }}</span>
          <span>Рейтинг: {{ movieStore.item?.rating }}</span>
        </p>
      </div>
    </div>
    <movie-sessions-list :movie-id="id"></movie-sessions-list>
  </u-container>
</template>

<script setup lang="ts">
import { useMovieStore } from "~/entities/movie";
import { MovieSessionsList } from "~/widgets";
import { PageHead } from "~/features/layout";

const movieStore = useMovieStore();
const route = useRoute();

const id = computed(() => Number(route.params.id));
const { error } = useAsyncData(`movie-${id.value}`, async () => {
  if (!movieStore.listRaw.length) {
    await movieStore.loadList();
  }
  movieStore.setItemId(Number(route.params.id));
  if (!movieStore.item) {
    throw createError({
      statusCode: 404,
      message: "Фильм не найден",
    });
  }

  return movieStore.item.id;
});
if (error.value) {
  throw error.value;
}

useSeoMeta({
  title: () => `Cinema Test${(movieStore.item && ` | ${movieStore.item.title}`) || ""}`,
});
</script>
