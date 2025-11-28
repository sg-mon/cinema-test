<template>
  <session-list :movie-id>
    <template #item="{ item }">
      <span v-if="item.cinema">{{ item.cinema.title }}</span>
    </template>
  </session-list>
</template>

<script setup lang="ts">
import { SessionList } from "~/features/session";

withDefaults(
  defineProps<{
    movieId: number;
  }>(),
  {},
);
</script>
