<template>
  <u-container>
    <movie-list></movie-list>
  </u-container>
</template>

<script setup lang="ts">
import { useMovieStore } from "~/entities/movie";
import { MovieList } from "~/widgets";

const movieStore = useMovieStore();

useAsyncData(`movies-list`, async () =>
  movieStore.listRaw.length ? movieStore.listRaw : movieStore.loadList(),
);

useSeoMeta({
  title: "Cinema Test | Фильмы",
});
</script>
