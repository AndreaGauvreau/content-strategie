import { useEffect, useState } from "react";
const LS_ROOT = "kuartz-calendar-v1";
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(LS_ROOT);
      const obj = raw ? JSON.parse(raw) : {};
      return key in obj ? (obj[key] as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_ROOT);
      const obj = raw ? JSON.parse(raw) : {};
      obj[key] = value;
      localStorage.setItem(LS_ROOT, JSON.stringify(obj));
    } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}
