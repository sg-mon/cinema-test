import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { SessionSeats } from "~/features/session";
import { useSessionStore } from "~/entities/session";
import { useUserStore } from "~/entities/user";
import { useBookingStore } from "~/entities/booking";

vi.mock("~/entities/user", () => ({
  useUserStore: vi.fn(),
}));

vi.mock("~/entities/session", () => ({
  useSessionStore: vi.fn(),
}));
vi.mock("~/entities/booking", () => ({
  useBookingStore: vi.fn(),
}));

const bookingResult = "123";
const bookMock = vi.fn().mockResolvedValue(bookingResult);

beforeEach(() => {
  (useSessionStore as any).mockReturnValue({
    item: {
      seatsInfo: { rows: 2, seatsPerRow: 2 },
      seats: [
        [
          { row: 1, seat: 1, isBooked: false },
          { row: 1, seat: 2, isBooked: false },
          { row: 2, seat: 1, isBooked: false },
          { row: 2, seat: 2, isBooked: false },
        ],
      ],
    },
  });

  (useUserStore as any).mockReturnValue({
    isAuth: false,
  });

  (useBookingStore as any).mockReturnValue({
    book: bookMock,
    loading: { book: false },
  });
});

describe("SessionSeats", () => {
  it("Проверка количества мест", async () => {
    const wrapper = mount(SessionSeats, { props: { sessionId: 1 } });
    await flushPromises();
    const seats = wrapper.findAll("table button");
    const seatsCount =
      useSessionStore().item?.seatsInfo.rows! * useSessionStore().item?.seatsInfo.seatsPerRow!;

    expect(seats.length).toBe(seatsCount);

    wrapper.unmount();
  });

  it("Не дает выбрать место неавторизованному пользователю", async () => {
    const wrapper = mount(SessionSeats, { props: { sessionId: 1 } });
    await flushPromises();
    const seat = wrapper.find("table button");
    await seat.trigger("click");
    expect(seat.classes()).not.toContain("bg-primary-400");
    wrapper.unmount();
  });

  it("Редиректит на /login при клике Забронировать неавторизованного пользователя", async () => {
    const pushMock = vi.fn();
    const router = useRouter();
    router.push = pushMock;

    const wrapper = mount(SessionSeats, {
      props: { sessionId: 1 },
      global: {
        plugins: [router],
      },
    });

    const allButtons = wrapper.findAll("button");
    const bookButton = allButtons.find((btn) => btn.text().includes("Забронировать"))!;

    await bookButton.trigger("click");

    await flushPromises();

    expect(pushMock).toHaveBeenCalledWith({ name: "login" });

    wrapper.unmount();
  });

  it("Выбор места и переход на /profile/booking", async () => {
    (useUserStore as any).mockReturnValue({
      isAuth: true,
    });

    const pushMock = vi.fn();
    const router = useRouter();
    router.push = pushMock;

    const wrapper = mount(SessionSeats, {
      props: { sessionId: 1 },
      global: {
        plugins: [router],
      },
    });

    const seat = wrapper.find("table button");
    await seat.trigger("click");

    const allButtons = wrapper.findAll("button");
    const bookButton = allButtons.find((btn) => btn.text().includes("Забронировать"))!;

    await bookButton.trigger("click");

    expect(bookMock).toHaveBeenCalledWith(
      1,
      [{ rowNumber: 1, seatNumber: 1 }],
      expect.objectContaining({
        movieTitle: expect.any(String),
        cinemaTitle: expect.any(String),
      }),
    );

    expect(pushMock).toHaveBeenCalledWith(`/profile/booking?b=${bookingResult}`);

    wrapper.unmount();
  });
});
