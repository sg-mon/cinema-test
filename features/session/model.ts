import { defineStore } from "pinia";
import { isAPIError, STORES, type APIError } from "~/shared";
import { useSessionStore } from "~/entities/session";
import { useCinemaStore } from "~/entities/cinema";
import { useMovieStore } from "~/entities/movie";
import type { SessionGroup } from "./types";

export const useSessionModule = defineStore(STORES.SESSION_FEATURE, () => {
  const toast = useToast();
  const sessionStore = useSessionStore();
  const cinemaStore = useCinemaStore();
  const movieStore = useMovieStore();

  const listByDateAndGroups = computed<Map<string, SessionGroup[]>>(() => {
    const sessions = sessionStore.list.sort((s1, s2) => Number(s1.date) - Number(s2.date));
    const listByDate = new Map();
    const result = new Map();

    for (const session of sessions) {
      if (!listByDate.has(session.dateFormatted)) {
        listByDate.set(session.dateFormatted, [session]);
      } else {
        listByDate.get(session.dateFormatted).push(session);
      }
    }

    for (const [date, sessions] of listByDate.entries()) {
      const res = new Map();
      for (const session of sessions) {
        const key = `${session.movieId}_${session.cinemaId}`;
        if (!res.has(key)) {
          res.set(key, {
            sessions: [],
            movie: movieStore.listMap.get(session.movieId),
            cinema: cinemaStore.listMap.get(session.cinemaId),
          });
        }
        res.get(key)?.sessions.push(session);
      }
      result.set(date, Array.from(res.values()));
    }

    return result;
  });

  async function loadList({ movieId, cinemaId }: { movieId?: number; cinemaId?: number }) {
    try {
      const [response] = await Promise.all([
        sessionStore.loadList({ movieId, cinemaId }),
        !cinemaStore.list.length && cinemaStore.loadList(),
        !movieStore.list.length && movieStore.loadList(),
      ]);
      return response;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при загрузке сеансов, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      return [];
    }
  }

  return {
    listByDateAndGroups,
    loadList,
  };
});
