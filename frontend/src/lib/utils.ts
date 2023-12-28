import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | undefined) {
  const words = name?.split(" ");

  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials;
}
