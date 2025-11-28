import { defineStore } from "pinia";
import { isAPIError, STORES, type APIError } from "~/shared";
import { type TCinemaAPIItem, CinemaModel, useCinemaAPI } from "~/entities/cinema";

export const useCinemaStore = defineStore(STORES.CINEMA, () => {
  const toast = useToast();
  const { fetchList } = useCinemaAPI();

  const cinemaAPI = useCinemaAPI();
  const listRaw = ref<TCinemaAPIItem[]>([]);
  const list = computed(() => listRaw.value.map((item) => new CinemaModel(item)));
  const listMap = computed<Map<number, CinemaModel>>(() => {
    const map = new Map();
    for (const item of list.value) {
      map.set(item.id, item);
    }
    return map;
  });

  async function loadList(): Promise<TCinemaAPIItem[]> {
    try {
      const response = await fetchList();
      listRaw.value = response;
      return response;
    } catch (err: APIError | unknown) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при загрузке списка кинотеатров, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      return [];
    }
  }

  const itemId = ref(0);
  const item = computed<CinemaModel | null>(
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
