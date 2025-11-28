import type { TBookingItem, TBookingSeat } from "./types";

export class BookingModel {
  id: string;
  bookedAt: string;
  isPaid: boolean = false;
  sessionId: number;
  seats: TBookingSeat[] = [];
  userId: number;

  constructor(raw: TBookingItem) {
    this.id = raw.id;
    this.bookedAt = raw.bookedAt;
    this.isPaid = raw.isPaid;
    this.sessionId = raw.movieSessionId;
    this.seats = raw.seats;
    this.userId = raw.userId;
  }

  get seatsFormatted(): string {
    return this.seats.map((seat) => `Ряд ${seat.rowNumber}, место ${seat.seatNumber}`).join("\n");
  }
}
