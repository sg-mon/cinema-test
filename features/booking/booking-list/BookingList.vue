<template>
  <booking-list-content
    :items="bookingModule.listByStatuses.unpaid"
    :columns="[
      { id: 'item', header: 'Неоплаченные' },
      { accessorKey: 'seatsFormatted', header: '' },
      { id: 'payment', header: '' },
      { id: 'timer', header: '' },
    ]"></booking-list-content>
  <booking-list-content
    :items="bookingModule.listByStatuses.next"
    :columns="[
      { id: 'item', header: 'Будущие' },
      { accessorKey: 'seatsFormatted', header: '' },
    ]"></booking-list-content>
  <booking-list-content
    :items="bookingModule.listByStatuses.past"
    :columns="[
      { id: 'item', header: 'Прошедшие' },
      { accessorKey: 'seatsFormatted', header: '' },
    ]"></booking-list-content>
</template>

<script setup lang="ts">
import { useBookingModule } from "~/features/booking";
import { useLayoutModule } from "~/features/layout";
import BookingListContent from "./BookingListContent.vue";

const bookingModule = useBookingModule();
</script>
