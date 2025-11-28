import type { TCinemaAPIItem } from "~/entities/cinema";

export class CinemaModel {
  id: number;
  title: string;
  address: string;

  constructor(raw: TCinemaAPIItem) {
    this.id = raw.id;
    this.title = raw.name;
    this.address = raw.address;
  }
}
