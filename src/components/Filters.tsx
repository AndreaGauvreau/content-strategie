"use client";
import PlatformIcon from "@/components/PlatformIcon";
const ALL = [
  "LinkedIn",
  "Instagram",
  "TikTok",
  "YouTube Shorts",
  "X",
  "Threads",
];
export default function Filters({
  active,
  onToggle,
  onSetAll,
  onClear,
}: {
  active: string[];
  onToggle: (p: string) => void;
  onSetAll: () => void;
  onClear: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {ALL.map((p) => (
        <button
          key={p}
          onClick={() => onToggle(p)}
          className={
            (active.includes(p)
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800") +
            " flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm shadow-sm"
          }
        >
          <span className="text-base">
            <PlatformIcon name={p} />
          </span>
          <span>{p}</span>
        </button>
      ))}
      <button
        onClick={onSetAll}
        className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
      >
        Tout
      </button>
      <button
        onClick={onClear}
        className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
      >
        Aucun
      </button>
    </div>
  );
}
