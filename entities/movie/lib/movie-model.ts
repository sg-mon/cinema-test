import type { TMovieAPIItem } from "~/entities/movie";
import { durationFormatter, getImagePath } from "~/shared";

export class MovieModel {
  id: number;
  title: string;
  description: string;
  year: number;
  duration: number;
  image: string;
  rating: number;

  constructor(raw: TMovieAPIItem) {
    this.id = raw.id;
    this.title = raw.title;
    this.description = raw.description;
    this.year = raw.year;
    this.duration = raw.lengthMinutes;
    this.image = raw.posterImage ? getImagePath(raw.posterImage) : "";
    this.rating = raw.rating;
  }

  get durationFormatted() {
    return durationFormatter(this.duration);
  }
}
