import type { TBookingItem, TBookingSeat } from "~/entities/booking";
import { apiFetch, useConfig } from "~/shared";

export function useBookingAPI() {
  const accessToken = useCookie("accessToken");

  async function bookSeats(
    movieSessionId: number,
    seats: TBookingSeat[],
  ): Promise<{ bookingId: string }> {
    return await apiFetch(
      `${useConfig().get("apiBaseUrl")}/movieSessions/${movieSessionId}/bookings`,
      {
        method: "POST",
        body: JSON.stringify({ seats }),
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
    );
  }

  async function payBooking(bookingId: string): Promise<{ message: string }> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/bookings/${bookingId}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
  }

  async function fetchList(): Promise<TBookingItem[]> {
    return await apiFetch(`${useConfig().get("apiBaseUrl")}/me/bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });
  }

  return { bookSeats, payBooking, fetchList };
}
