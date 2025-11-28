<template>
  <u-container>
    <cinema-list></cinema-list>
  </u-container>
</template>

<script setup lang="ts">
import { CinemaList } from "~/widgets";
import { useCinemaStore } from "~/entities/cinema";

const cinemaStore = useCinemaStore();

useAsyncData(`cinema-list`, async () =>
  cinemaStore.listRaw.length ? cinemaStore.listRaw : cinemaStore.loadList(),
);

useSeoMeta({
  title: "Cinema Test | Кинотеатры",
});
</script>
