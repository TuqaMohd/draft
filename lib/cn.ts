import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class lists the way every shadcn/ui-style component expects:
 * clsx() handles conditionals/arrays, twMerge() resolves conflicting
 * Tailwind utilities (e.g. a caller passing `px-6` to override a
 * component's default `px-4` no longer produces two competing classes).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
