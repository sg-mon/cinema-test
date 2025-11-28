import { defineStore } from "pinia";
import { isAPIError, STORES, type APIError } from "~/shared";
import { BookingModel, useBookingStore } from "~/entities/booking";
import { useSessionStore } from "~/entities/session";

export const useBookingModule = defineStore(STORES.BOOKING_FEATURE, () => {
  const bookingStore = useBookingStore();

  const listByStatuses = computed(() => {
    const result: { unpaid: BookingModel[]; next: BookingModel[]; past: BookingModel[] } = {
      unpaid: [],
      next: [],
      past: [],
    };

    const now = Number(new Date());
    for (const item of bookingStore.list) {
      if (!item.isPaid) {
        result.unpaid.push(item);
      } else {
        const meta = bookingStore.bookingMeta.ref[item.id];
        if (!meta || Number(new Date(meta.sessionDate || "")) < now) {
          result.past.push(item);
        } else {
          result.next.push(item);
        }
      }
    }
    return result;
  });

  return { listByStatuses };
});
