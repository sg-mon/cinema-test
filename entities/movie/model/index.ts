import { defineStore } from "pinia";
import { isAPIError, STORES, type APIError } from "~/shared";
import { useMovieAPI, MovieModel, type TMovieAPIItem } from "~/entities/movie";

export const useMovieStore = defineStore(STORES.MOVIE, () => {
  const toast = useToast();

  const { fetchList } = useMovieAPI();

  const listRaw = ref<TMovieAPIItem[]>([]);
  const list = computed<MovieModel[]>(() => listRaw.value.map((item) => new MovieModel(item)));
  const listMap = computed<Map<number, MovieModel>>(() => {
    const map = new Map();
    for (const item of list.value) {
      map.set(item.id, item);
    }
    return map;
  });

  async function loadList(): Promise<TMovieAPIItem[]> {
    try {
      const response = await fetchList();
      listRaw.value = response;
      return response;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при загрузке списка фильмов, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      return [];
    }
  }

  const itemId = ref(0);
  const item = computed<MovieModel | null>(
    () => list.value.find((item) => item.id === itemId.value) ?? null,
  );
  function setItemId(id: number) {
    itemId.value = id;
  }

  return {
    listRaw,
    list,
    listMap,
    loadList,

    itemId,
    item,
    setItemId,
  };
});
