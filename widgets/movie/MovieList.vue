<template>
  <u-table :data="movieStore.list" :columns class="movie-list">
    <template #image-cell="{ row: { original } }">
      <img
        :src="original.image"
        :alt="original.title"
        class="rounded-md h-40 object-cover min-w-20" />
    </template>
    <template #actions-cell="{ row: { original } }">
      <u-button :to="`/movies/${original.id}`">Посмотреть сеансы</u-button>
    </template>
  </u-table>
</template>

<script setup lang="ts">
import { useMovieStore } from "~/entities/movie";

const movieStore = useMovieStore();
const columns = [
  { accessorKey: "image", header: " " },
  { accessorKey: "title", header: "Название" },
  { accessorKey: "durationFormatted", header: "Продолжительность" },
  { accessorKey: "rating", header: "Рейтинг" },
  { id: "actions", header: "" },
];
</script>

<style>
.movie-list th:last-child {
  width: 1%;
}
</style>
