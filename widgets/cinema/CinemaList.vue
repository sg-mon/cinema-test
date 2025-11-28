<template>
  <u-table :data="cinemaStore.list" :columns class="cinema-list">
    <template #actions-cell="{ row: { original } }">
      <u-button :to="`/cinemas/${original.id}`">Посмотреть сеансы</u-button>
    </template>
  </u-table>
</template>

<script setup lang="ts">
import { useCinemaStore } from "~/entities/cinema";

const cinemaStore = useCinemaStore();
const columns = [
  { accessorKey: "title", header: "Кинотеатр" },
  { accessorKey: "address", header: "Адрес" },
  { id: "actions", header: "" },
];
</script>

<style>
.cinema-list th:last-child {
  width: 1%;
}
</style>
