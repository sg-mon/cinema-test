<template>
  <u-table :data="items" :columns class="booking-list">
    <template #item-cell="{ row: { original } }">
      <span v-if="bookingStore.bookingMeta.ref?.[original.id]">
        <span>{{ bookingStore.bookingMeta.ref?.[original.id].movieTitle }}</span
        ><br />
        <span>{{ bookingStore.bookingMeta.ref?.[original.id].cinemaTitle }}</span
        ><br />
        <span>{{ bookingStore.bookingMeta.ref?.[original.id].sessionDateFormatted }}</span>
      </span>
    </template>
    <template #payment-cell="{ row: { original } }">
      <u-button
        v-if="!original.isPaid"
        size="lg"
        :loading="bookingStore.loading.pay && bookingProcessing === original.id"
        :disabled="bookingStore.loading.pay && bookingProcessing !== original.id"
        @click="pay(original)"
        >Оплатить</u-button
      >
    </template>
    <template #timer-cell="{ row: { original } }">
      <the-timer
        v-if="!original.isPaid && original.bookedAt"
        :duration="timerDuration"
        :date-start="original.bookedAt"
        @end="bookingStore.loadList()"></the-timer>
    </template>
    <template #seatsFormatted-cell="{ row: { original } }">
      <span class="whitespace-pre-line">{{ original.seatsFormatted }}</span>
    </template>
  </u-table>
</template>

<script setup lang="ts">
import { BookingModel, useBookingStore } from "~/entities/booking";
import type { TableColumn } from "@nuxt/ui";
import { TheTimer } from "~/components/ui";
import { useConfig } from "~/shared";

const props = withDefaults(
  defineProps<{
    items: BookingModel[];
    columns: TableColumn<BookingModel, unknown>[];
  }>(),
  {},
);

const bookingStore = useBookingStore();

const timerDuration = computed(() => Number(useConfig().get("bookingPaymentTimeSeconds")) | 0);

const bookingProcessing = ref("");
async function pay(item: BookingModel) {
  bookingProcessing.value = item.id;
  await bookingStore.pay(item.id, true);
  bookingProcessing.value = "";
}
</script>

<style>
.booking-list th:first-child {
  width: 40%;
}
</style>
