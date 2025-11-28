import { defineStore } from "pinia";
import { isAPIError, STORES, useLocalStorage, type APIError } from "~/shared";
import {
  BookingModel,
  useBookingAPI,
  type TBookingItem,
  type TBookingItemMeta,
  type TBookingSeat,
} from "~/entities/booking";

export const useBookingStore = defineStore(STORES.BOOKING, () => {
  const toast = useToast();
  const { fetchList, bookSeats, payBooking } = useBookingAPI();

  const loading = reactive({ book: false, pay: false, list: false });

  const bookingMeta = useLocalStorage<Record<string, TBookingItemMeta>>("bookMeta", {});

  async function book(
    movieSessionId: number,
    data: TBookingSeat[],
    meta?: TBookingItemMeta,
  ): Promise<string | false> {
    try {
      loading.book = true;
      if (!data.length) {
        throw { data: { message: "Места не выбраны" } };
      }
      const response = await bookSeats(movieSessionId, data);
      loading.book = false;
      if (meta) {
        bookingMeta.set({
          ...bookingMeta.ref.value,
          [response.bookingId]: meta,
        });
      }
      return response.bookingId;
    } catch (err) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при бронировании мест, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      loading.book = false;
      return false;
    }
  }

  async function pay(bookingId: string, reoadList: boolean = false): Promise<boolean> {
    try {
      loading.pay = true;
      if (!bookingId) {
        throw { data: { message: "Сеанс не выбран" } };
      }
      const response = await payBooking(bookingId);
      loading.pay = false;
      if (response.message) {
        toast.add({
          title: response.message,
          color: "success",
        });
      }
      if (reoadList) {
        await loadList();
      }
      return true;
    } catch (err) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при попытке оплатить билет, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      loading.pay = false;
      return false;
    }
  }

  const listRaw = ref<TBookingItem[]>([]);
  const list = computed(() => listRaw.value.map((item) => new BookingModel(item)));
  async function loadList() {
    try {
      loading.list = true;
      const response = await fetchList();
      listRaw.value = response;
      loading.list = false;
      return response;
    } catch (err) {
      toast.add({
        title: isAPIError(err)
          ? err.data.message
          : "Ошибка при получении списка билетов, попробуйте позже!",
        color: "error",
      });
      console.error("error", err);
      loading.list = false;
      return [];
    }
  }

  return {
    loading,
    bookingMeta,
    book,

    pay,

    listRaw,
    list,
    loadList,
  };
});
