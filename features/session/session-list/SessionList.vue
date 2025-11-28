<template>
  <u-table
    v-for="[date, value] of sessionModule.listByDateAndGroups"
    :key="date"
    :data="value"
    :columns="[
      { accessorKey: 'item', header: date },
      { id: 'actions', header: '' },
    ]"
    class="session-list">
    <template #item-cell="{ row: { original } }">
      <slot name="item" :item="original"></slot>
    </template>
    <template #actions-cell="{ row: { original } }">
      <div class="flex gap-2">
        <u-button
          v-for="session of original.sessions"
          :key="session.id"
          :to="`/sessions/${session.id}`">
          {{ session.startTime }}
        </u-button>
      </div>
    </template>
  </u-table>
</template>

<script setup lang="ts">
import { useSessionStore } from "~/entities/session";
import { useSessionModule } from "~/features/session";

const sessionModule = useSessionModule();

const props = withDefaults(
  defineProps<{
    cinemaId?: number;
    movieId?: number;
  }>(),
  {
    cinemaId: 0,
    movieId: 0,
  },
);

useAsyncData(`session-list-movie-${props.movieId}-cinema-${props.cinemaId}`, () => {
  return sessionModule.loadList({
    cinemaId: props.cinemaId,
    movieId: props.movieId,
  });
});
</script>

<style>
.session-list th:last-child {
  width: 1%;
}
</style>
