import Papa from "papaparse";
import { format } from "date-fns";
import { parseDateSmart } from "@/lib/date";
import type { Item, Row } from "@/types/content";

const ALIASES: Record<string, string> = {
  linkedin: "LinkedIn",
  li: "LinkedIn",
  "x (twitter)": "X",
  twitter: "X",
  x: "X",
  threads: "Threads",
  instagram: "Instagram",
  insta: "Instagram",
  ig: "Instagram",
  tiktok: "TikTok",
  tt: "TikTok",
  shorts: "YouTube Shorts",
  youtube: "YouTube Shorts",
  "youtube shorts": "YouTube Shorts",
};
export const prettyPlatform = (v: string) => {
  const k = (v || "").trim().toLowerCase();
  if (ALIASES[k]) return ALIASES[k];
  for (const key of Object.keys(ALIASES))
    if (k.includes(key)) return ALIASES[key];
  return v;
};

export function parseCsv(
  csvText: string,
  opts: {
    dateCol?: string;
    platformCol?: string;
    tagCol?: string;
    notesCol?: string;
  }
) {
  if (!csvText.trim())
    return { headers: [] as string[], rows: [] as Row[], items: [] as Item[] };
  const res = Papa.parse<Row>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  const rows = (res.data || []).filter(Boolean);
  const headers = res.meta.fields || [];

  const dc =
    headers.find(
      (h) => h.toLowerCase() === (opts.dateCol || "date").toLowerCase()
    ) ||
    headers.find((h) => h.toLowerCase().includes("date")) ||
    headers[0];
  const pc =
    headers.find(
      (h) => h.toLowerCase() === (opts.platformCol || "platform").toLowerCase()
    ) || headers.find((h) => /platform|channel|réseau|reseau|network/i.test(h));
  const tc = headers.find(
    (h) => h.toLowerCase() === (opts.tagCol || "tag").toLowerCase()
  );
  const nc = headers.find(
    (h) => h.toLowerCase() === (opts.notesCol || "notes").toLowerCase()
  );
  const ideaCols = headers.filter((h) => /id[ée]e|idea|alt/i.test(h));

  const items: Item[] = [];
  for (const r of rows) {
    const d = parseDateSmart(String(r[dc] || ""));
    if (!d) continue;
    const iso = format(d, "yyyy-MM-dd");
    const platform = prettyPlatform(String(r[pc || "platform"] || ""));
    const tag = tc ? String(r[tc] || "") : undefined;
    const notes = nc ? String(r[nc] || "") : undefined;
    const ideas = ideaCols
      .map((c) => String(r[c] || "").trim())
      .filter(Boolean);
    items.push({ date: iso, platform, tag, ideas, notes, raw: r });
  }
  return { headers, rows, items };
}
