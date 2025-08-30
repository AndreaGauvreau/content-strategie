"use client";

import { useMemo, useState } from "react";
import { addMonths, subMonths, startOfMonth } from "date-fns";
import { parseCsv } from "@/lib/csv";
import { useLocalState } from "@/lib/localState";
import type { Item } from "@/types/content";
import Filters from "@/components/Filters";
import CSVMapper from "@/components/CSVMapper";
import CalendarGrid from "@/components/CalendarGrid";
import ModalDay from "@/components/ModalDay";

export default function CalendarApp() {
  const [theme, setTheme] = useLocalState<"light" | "dark">("theme", "dark");
  const [cursor, setCursor] = useState<Date>(startOfMonth(new Date()));

  // CSV + mapping de colonnes
  const [csvText, setCsvText] = useLocalState<string>("csvText", "");
  const [dateCol, setDateCol] = useLocalState<string>("dateCol", "date");
  const [platformCol, setPlatformCol] = useLocalState<string>(
    "platformCol",
    "platform"
  );
  const [tagCol, setTagCol] = useLocalState<string>("tagCol", "tag");
  const [notesCol, setNotesCol] = useLocalState<string>("notesCol", "notes");

  // Done + filtres
  const [doneDays, setDoneDays] = useLocalState<string[]>("doneDays", []);
  const [activePlatforms, setActivePlatforms] = useLocalState<string[]>(
    "filters",
    ["LinkedIn", "Instagram", "TikTok", "YouTube Shorts", "X", "Threads"]
  );

  const { headers, items } = useMemo(
    () => parseCsv(csvText, { dateCol, platformCol, tagCol, notesCol }),
    [csvText, dateCol, platformCol, tagCol, notesCol]
  );

  // Modal
  const [modalDate, setModalDate] = useState<string | null>(null);
  const itemsForDate = useMemo<Item[]>(
    () => (modalDate ? items.filter((it) => it.date === modalDate) : []),
    [items, modalDate]
  );

  const toggleDone = (iso: string) =>
    setDoneDays((p) =>
      p.includes(iso) ? p.filter((d) => d !== iso) : [...p, iso]
    );

  const toggleFilter = (p: string) =>
    setActivePlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  return (
    <div
      className={
        (theme === "dark" ? "dark" : "") +
        " min-h-screen w-full bg-neutral-50 dark:bg-neutral-950"
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Kuartz — Content Calendar
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Desktop only • full-width • local save
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={() => setCursor(startOfMonth(new Date()))}
              className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Aujourd&apos;hui
            </button>
            <button
              onClick={() => setCursor((d) => subMonths(d, 1))}
              className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              ◀︎
            </button>
            <button
              onClick={() => setCursor((d) => addMonths(d, 1))}
              className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              ▶︎
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_360px] gap-6">
          <div>
            <Filters
              active={activePlatforms}
              onToggle={toggleFilter}
              onSetAll={() =>
                setActivePlatforms([
                  "LinkedIn",
                  "Instagram",
                  "TikTok",
                  "YouTube Shorts",
                  "X",
                  "Threads",
                ])
              }
              onClear={() => setActivePlatforms([])}
            />
            <CalendarGrid
              cursor={cursor}
              items={items}
              activePlatforms={activePlatforms}
              doneDays={doneDays}
              onToggleDone={toggleDone}
              onOpenDate={setModalDate}
            />
          </div>
          <div>
            <CSVMapper
              csvText={csvText}
              setCsvText={setCsvText}
              headers={headers}
              dateCol={dateCol}
              setDateCol={setDateCol}
              platformCol={platformCol}
              setPlatformCol={setPlatformCol}
              tagCol={tagCol}
              setTagCol={setTagCol}
              notesCol={notesCol}
              setNotesCol={setNotesCol}
            />
          </div>
        </div>
      </div>
      <ModalDay
        dateIso={modalDate}
        items={itemsForDate}
        onClose={() => setModalDate(null)}
      />
    </div>
  );
}
