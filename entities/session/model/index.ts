import { defineStore } from "pinia";
import { isAPIError, STORES, type APIError } from "~/shared";
import { SessionModel, type TSessionAPIListItem, useSessionAPI } from "~/entities/session";

export const useSessionStore = defineStore(STORES.SESSION, () => {
  const toast = useToast();

  const { fetchListByMovieId, fetchListByCinemaId, fetchItem } = useSessionAPI();

  const listRaw = ref<TSessionAPIListItem[]>([]);
  const list = computed(() => listRaw.value.map((item) => new SessionModel(item)));
  const listMap = computed<Map<number, SessionModel>>(() => {
    const map = new Map();
    for (const item of list.value) {
      map.set(item.id, item);
    }
    return map;
  });
  async function loadList({
    movieId,
    cinemaId,
  }: {
    movieId?: number;
    cinemaId?: number;
  }): Promise<TSessionAPIListItem[]> {
    try {
      listRaw.value = [];
      if (movieId) {
        listRaw.value = await loadListForMovie(movieId);
      } else if (cinemaId) {
        listRaw.value = await loadListForCinema(cinemaId);
      } else {
        throw new Error("ID is required!");
      }
      return listRaw.value;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при загрузке списка сеансов, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      return [];
    }
  }

  async function loadListForMovie(id: number): Promise<TSessionAPIListItem[]> {
    return fetchListByMovieId(id);
  }
  async function loadListForCinema(id: number): Promise<TSessionAPIListItem[]> {
    return await fetchListByCinemaId(id);
  }

  const itemRaw = ref();
  const item = computed<SessionModel | null>(() =>
    itemRaw.value ? new SessionModel(itemRaw.value) : null,
  );
  async function loadItem(sessionId: number) {
    try {
      const response = await fetchItem(sessionId);
      itemRaw.value = response;
      return response;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при загрузке информации о сеансе, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      return null;
    }
  }

  return {
    listRaw,
    list,
    listMap,
    loadList,

    itemRaw,
    item,
    loadItem,
  };
});
