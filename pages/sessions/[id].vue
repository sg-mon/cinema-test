<template>
  <u-container>
    <page-head>Выбрать места</page-head>
    <p class="text-base flex flex-col mb-8">
      <span>Фильм: {{ movie?.title }}</span>
      <span>Кинотеатр: {{ cinema?.title }}</span>
      <span>Время: {{ sessionStore.item?.dateTime }}</span>
    </p>
    <session-seats :session-id="sessionId"></session-seats>
  </u-container>
</template>

<script setup lang="ts">
import { useCinemaStore } from "~/entities/cinema";
import { useMovieStore } from "~/entities/movie";
import { useSessionStore } from "~/entities/session";
import { SessionSeats } from "~/features/session";
import { PageHead } from "~/features/layout";

const route = useRoute();
const sessionId = computed(() => Number(route.params.id));

const sessionStore = useSessionStore();
const movieStore = useMovieStore();
const cinemaStore = useCinemaStore();

const movie = computed(() =>
  sessionStore.item ? movieStore.listMap.get(sessionStore.item?.movieId) : null,
);
const cinema = computed(() =>
  sessionStore.item ? cinemaStore.listMap.get(sessionStore.item?.cinemaId) : null,
);

const { error } = useAsyncData(`session-page-${sessionId}`, async () => {
  await Promise.all([
    !movieStore.list.length && movieStore.loadList(),
    !cinemaStore.list.length && cinemaStore.loadList(),
    sessionStore.loadItem(sessionId.value),
  ]);

  if (!sessionStore.item) {
    throw createError({
      statusCode: 404,
      message: "Сеанс не найден",
    });
  }
  return sessionStore.item.id;
});
if (error.value) {
  throw error.value;
}
useSeoMeta({
  title: () =>
    `Cinema Test${(sessionStore.item && ` | Сеанс ${sessionStore.item.dateTime}`) || ""}`,
});
</script>
