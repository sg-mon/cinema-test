export function durationFormatter(duration: number): string {
  if (duration < 0 || !Number.isFinite(duration)) {
    throw new Error("Invalid duration");
  }

  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${hours}:${pad(minutes)}`;
}

export function dateFormatter(date: Date | string | number): string {
  const value = new Date(date);

  if (isNaN(value.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(value.getDate()).padStart(2, "0");
  const month = String(value.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}`;
}

export function fullDateFormatter(date: Date | string | number): string {
  const value = new Date(date);

  if (isNaN(value.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(value.getDate()).padStart(2, "0");
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const year = value.getFullYear();

  return `${day}.${month}.${year}`;
}

export function timeFormatter(date: Date | string | number): string {
  const value = new Date(date);

  if (isNaN(value.getTime())) {
    throw new Error("Invalid date");
  }

  const hours = value.getHours().toString().padStart(2, "0");
  const minutes = value.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
export function timeSecondsFormatter(seconds: number, showHoursIfZero = false): string {
  if (seconds < 0) seconds = 0;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const hoursPart = hours > 0 || showHoursIfZero ? `${hours.toString().padStart(2, "0")}:` : "";
  const minutesPart = `${minutes.toString().padStart(2, "0")}`;
  const secondsPart = `${sec.toString().padStart(2, "0")}`;

  return `${hoursPart}${minutesPart}:${secondsPart}`;
}
