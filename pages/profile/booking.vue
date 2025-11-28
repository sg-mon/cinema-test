<template>
  <u-container>
    <page-head>Мои билеты</page-head>
    <booking-list></booking-list>
  </u-container>
</template>

<script setup lang="ts">
import { useBookingStore } from "~/entities/booking";
import { BookingList } from "~/features/booking";
import { useLayoutModule } from "~/features/layout";
import { PageHead } from "~/features/layout";

definePageMeta({
  middleware: ["authorized"],
});

const bookingStore = useBookingStore();

useAsyncData(`booking-list`, () => bookingStore.loadList());

useSeoMeta({
  title: "Cinema Test | Мои билеты",
});
</script>
