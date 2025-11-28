export type TSessionItemSeatsInfo = {
  rows: number;
  seatsPerRow: number;
};

export type TSessionItemSeat = {
  row: number;
  seat: number;
  isBooked: boolean;
};

export type TSessionBookItem = {
  rowNumber: number;
  seatNumber: number;
};

export type TSessionAPIListItem = {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
};

export type TSessionAPIItem = TSessionAPIListItem & {
  seats: TSessionItemSeatsInfo;
  bookedSeats: TSessionBookItem[];
};
