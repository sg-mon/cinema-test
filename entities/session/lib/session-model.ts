import type {
  TSessionAPIListItem,
  TSessionAPIItem,
  TSessionItemSeatsInfo,
  TSessionBookItem,
  TSessionItemSeat,
} from "~/entities/session";
import { dateFormatter, timeFormatter } from "~/shared";

export class SessionModel {
  id: number;
  movieId: number;
  cinemaId: number;
  date: Date | null;
  seatsInfo: TSessionItemSeatsInfo = {
    rows: 0,
    seatsPerRow: 0,
  };
  _bookedSeats: TSessionBookItem[] = [];

  constructor(raw: TSessionAPIListItem | TSessionAPIItem) {
    this.id = raw.id;
    this.movieId = raw.movieId || 0;
    this.cinemaId = raw.cinemaId || 0;

    const date = new Date(raw.startTime);
    this.date = !isNaN(date.valueOf()) ? date : null;

    if ("seats" in raw) {
      this.seatsInfo.rows = raw.seats?.rows || 0;
      this.seatsInfo.seatsPerRow = raw.seats?.seatsPerRow || 0;
    }

    if ("bookedSeats" in raw) {
      this._bookedSeats = raw.bookedSeats || [];
    }
  }

  get seats(): TSessionItemSeat[][] {
    const bookedSeatsMap: Record<string, boolean> = {};
    for (const seat of this._bookedSeats) {
      bookedSeatsMap[`${seat.rowNumber}_${seat.seatNumber}`] = true;
    }
    const result = Array(this.seatsInfo.rows)
      .fill(0)
      .map((_, rowIndex) =>
        Array(this.seatsInfo.seatsPerRow)
          .fill(0)
          .map((_, seatIndex) => ({
            row: rowIndex + 1,
            seat: seatIndex + 1,
            isBooked: bookedSeatsMap[`${rowIndex + 1}_${seatIndex + 1}`],
          })),
      );
    return result;
  }

  get dateFormatted(): string {
    return this.date ? dateFormatter(this.date) : "";
  }

  get startTime(): string {
    return this.date ? timeFormatter(this.date) : "";
  }

  get dateTime(): string {
    return this.dateFormatted && this.startTime ? `${this.dateFormatted}, ${this.startTime}` : "";
  }
}
