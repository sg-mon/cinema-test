<template>
  <default-layout>
    <h2 class="h2-style text-5xl! mb-8">404</h2>
    <p v-if="error" class="text-xl mb-4">{{ error }}</p>
    <div>
      <u-button to="/">На главную</u-button>
    </div>
  </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from "~/layouts/default.vue";
const props = defineProps({
  error: Object,
});
</script>
