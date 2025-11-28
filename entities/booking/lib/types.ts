export type TBookingSeat = { rowNumber: number; seatNumber: number };
export type TBookingItem = {
  bookedAt: string;
  id: string;
  isPaid: boolean;
  movieSessionId: number;
  seats: TBookingSeat[];
  userId: number;
};

export type TBookingItemMeta = {
  cinemaTitle: string;
  movieTitle: string;
  sessionDateFormatted: string;
  sessionDate: Date | null;
};
