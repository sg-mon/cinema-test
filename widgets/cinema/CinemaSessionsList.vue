<template>
  <session-list :cinema-id>
    <template #item="{ item }">
      <div v-if="item.movie" class="flex items-center gap-4">
        <img
          :src="item.movie.image"
          :alt="item.movie.title"
          class="w-20 h-20 object-cover rounded-md" />
        <span>{{ item.movie.title }}</span>
      </div>
    </template>
  </session-list>
</template>

<script setup lang="ts">
import { SessionList } from "~/features/session";

withDefaults(
  defineProps<{
    cinemaId: number;
  }>(),
  {},
);
</script>
