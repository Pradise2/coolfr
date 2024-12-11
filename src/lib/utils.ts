import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compactNumber(num: number) {
  return num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    notation: "compact",
  });
}
