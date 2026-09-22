import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats whole-dollar currency without trailing cents. */
export function currency(value: number, opts: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...opts,
  }).format(value);
}

/** "307-555-0142" -> "tel:+13075550142" */
export function telHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}
