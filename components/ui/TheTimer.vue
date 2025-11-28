<template>Осталось: {{ formattedTime }}</template>

<script setup lang="ts">
import { timeSecondsFormatter } from "~/shared";

const props = withDefaults(
  defineProps<{
    dateStart: string | Date;
    duration: number;
  }>(),
  {},
);

const emit = defineEmits<{
  (e: "end"): void;
}>();

const remaining = ref(props.duration + 2);

let intervalId: number | undefined;

const formattedTime = computed(() => {
  return timeSecondsFormatter(remaining.value);
});

function updateRemaining() {
  const now = new Date();
  const start = new Date(props.dateStart);
  const elapsed = Math.floor((now.getTime() - start.getTime()) / 1000);
  remaining.value = Math.max(props.duration - elapsed, 0);

  if (remaining.value <= 0) {
    clearInterval(intervalId);
    emit("end");
  }
}

onMounted(() => {
  updateRemaining();
  intervalId = window.setInterval(updateRemaining, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

watch([() => props.dateStart, () => props.duration], () => {
  updateRemaining();
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = window.setInterval(updateRemaining, 1000);
});
</script>
