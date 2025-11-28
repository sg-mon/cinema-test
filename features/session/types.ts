import type { CinemaModel } from "~/entities/cinema";
import type { MovieModel } from "~/entities/movie";
import type { SessionModel } from "~/entities/session";

export type SessionGroup = {
  movieId: number;
  cinemaId: number;
  movie?: MovieModel;
  cinema?: CinemaModel;
  sessions: SessionModel[];
};
