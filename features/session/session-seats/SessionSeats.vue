<template>
  <table class="mb-4">
    <thead>
      <tr>
        <th class="w-[1%] whitespace-nowrap"></th>
        <th
          v-for="seat in sessionStore.item?.seatsInfo?.seatsPerRow"
          :key="`head-seat-${seat}`"
          class="pb-4">
          {{ seat }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in sessionStore.item?.seats" :key="`row-${row}`">
        <td class="whitespace-nowrap pr-4">Ряд {{ rowIndex + 1 }}.</td>
        <td v-for="seat in row" :key="`seat-${seat}`" class="text-center">
          <button
            @click="tryToBook(seat)"
            class="inline-block w-14 h-14 border rounded-md m-4 [&_can-book]:"
            :class="{
              'bg-error-400': seat.isBooked,
              'bg-primary-400': toBook[`${seat.row}:${seat.seat}`],
              'hover:bg-primary-400': userStore.isAuth,
            }"></button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-center">
    <u-button size="xl" :disabled="canBook" :loading="bookingStore.loading.book" @click="tryBooking"
      >Забронировать</u-button
    >
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from "~/entities/booking";
import { useCinemaStore } from "~/entities/cinema";
import { useMovieStore } from "~/entities/movie";
import { useSessionStore, type TSessionItemSeat } from "~/entities/session";
import { useUserStore } from "~/entities/user";
import { useSessionModule } from "~/features/session";

const sessionModule = useSessionModule();
const sessionStore = useSessionStore();
const bookingStore = useBookingStore();
const movieStore = useMovieStore();
const cinemaStore = useCinemaStore();

const movie = computed(() =>
  sessionStore.item ? movieStore.listMap.get(sessionStore.item?.movieId) : null,
);
const cinema = computed(() =>
  sessionStore.item ? cinemaStore.listMap.get(sessionStore.item?.cinemaId) : null,
);

const props = withDefaults(
  defineProps<{
    sessionId: number;
  }>(),
  {},
);

const toBook = reactive<Record<string, boolean>>({});
const canBook = computed(() => !Object.values(toBook).find((item) => item));
const userStore = useUserStore();

function tryToBook(seat: TSessionItemSeat) {
  if (userStore.isAuth && !seat.isBooked) {
    if (toBook[`${seat.row}:${seat.seat}`]) {
      delete toBook[`${seat.row}:${seat.seat}`];
    } else {
      toBook[`${seat.row}:${seat.seat}`] = true;
    }
  }
}

const router = useRouter();
async function tryBooking() {
  if (!userStore.isAuth) {
    return;
  }
  const seats = Object.keys(toBook).map((value) => {
    const [row, seat] = value.split(":");
    return {
      rowNumber: Number(row),
      seatNumber: Number(seat),
    };
  });

  const result = await bookingStore.book(props.sessionId, seats, {
    movieTitle: movie.value?.title || "",
    cinemaTitle: cinema.value?.title || "",
    sessionDateFormatted: sessionStore.item?.dateTime || "",
    sessionDate: sessionStore.item?.date || null,
  });
  if (result) {
    router.push(`/profile/booking?b=${result}`);
  }
}
</script>
