import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractText(htmlString: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
}