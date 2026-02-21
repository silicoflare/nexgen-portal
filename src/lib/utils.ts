import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function setDeep(obj: any, path: string, value: any) {
  const parts = path
    .replace(/\[(\d+)\]/g, ".$1") // students[0] → students.0
    .split(".");

  let current = obj;

  parts.forEach((part, i) => {
    const isLast = i === parts.length - 1;
    const nextPart = parts[i + 1];
    const isIndex = !isNaN(Number(nextPart));

    if (isLast) {
      current[part] = value;
      return;
    }

    if (!(part in current)) {
      current[part] = isIndex ? [] : {};
    }

    current = current[part];
  });
}

export function unflatten(row: Record<string, any>) {
  const result: any = {};

  for (const [key, value] of Object.entries(row)) {
    if (value === "" || value == null || value == "-") continue;
    setDeep(result, key, value);
  }

  return result;
}