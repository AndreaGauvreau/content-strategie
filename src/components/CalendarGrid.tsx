"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  parseISO,
} from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import PlatformIcon from "@/components/PlatformIcon";
import type { Item } from "@/types/content";
import { useState, useEffect } from "react";

export default function CalendarGrid({
  cursor,
  items,
  activePlatforms,
  doneDays,
  onToggleDone,
  onOpenDate,
}: {
  cursor: Date;
  items: Item[];
  activePlatforms: string[];
  doneDays: string[];
  onToggleDone: (iso: string) => void;
  onOpenDate: (iso: string) => void;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const start = startOfMonth(cursor);
  const end = endOfMonth(cursor);
  const gridStart = startOfWeek(start, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(end, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const monthItems = items.filter((it) => {
    const d = parseISO(it.date);
    return d >= start && d <= end && activePlatforms.includes(it.platform);
  });

  const map: Record<string, Item[]> = {};
  for (const it of monthItems) {
    map[it.date] ||= [];
    map[it.date].push(it);
  }

  if (!hydrated) {
    return null;
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          {format(cursor, "LLLL yyyy", { locale: fr })}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <div
            key={d}
            className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-400"
          >
            {d}
          </div>
        ))}

        {days.map((d) => {
          const iso = format(d, "yyyy-MM-dd");
          const list = map[iso] || [];
          const isCur = isSameMonth(d, cursor);
          const done = doneDays.includes(iso);

          return (
            <motion.div
              key={iso}
              layout
              className={
                "min-h-[140px] rounded-2xl border p-2 shadow-sm cursor-pointer " +
                "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 " +
                (!isCur ? "opacity-40" : "")
              }
              onClick={() => onOpenDate(iso)}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {format(d, "d")}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleDone(iso);
                  }}
                  className={
                    "rounded-lg px-2 py-1 text-xs " +
                    (done
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200")
                  }
                >
                  {done ? "Fait" : "À faire"}
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {list
                  .sort((a, b) => a.platform.localeCompare(b.platform))
                  .map((it, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                      <span className="text-sm">
                        <PlatformIcon name={it.platform} />
                      </span>
                      {it.platform}
                      {it.tag && (
                        <span className="ml-1 rounded-full bg-neutral-200 px-1 py-0.5 text-[10px] text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                          {it.tag}
                        </span>
                      )}
                      <span className="ml-1 text-[10px] opacity-70">
                        {it.ideas?.length || 0} alt.
                      </span>
                    </span>
                  ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
