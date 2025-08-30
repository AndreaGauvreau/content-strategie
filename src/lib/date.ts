import { parse, parseISO, isValid } from "date-fns";
export const parseDateSmart = (val: string): Date | null => {
  if (!val) return null;
  const iso = parseISO(val.trim());
  if (isValid(iso)) return iso;
  const patterns = [
    "dd/MM/yyyy",
    "d/M/yyyy",
    "dd-MM-yyyy",
    "d-M-yyyy",
    "yyyy/MM/dd",
    "yyyy-MM-dd",
  ];
  for (const p of patterns) {
    const d = parse(val.trim(), p, new Date());
    if (isValid(d)) return d;
  }
  return null;
};
