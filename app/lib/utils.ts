import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type OllamaResponseChunk = {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
};
