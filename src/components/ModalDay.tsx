"use client";
import { AnimatePresence, motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import PlatformIcon from "@/components/PlatformIcon";
import type { Item } from "@/types/content";

export default function ModalDay({
  dateIso,
  items,
  onClose,
}: {
  dateIso: string | null;
  items: Item[];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {dateIso && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[80vh] w-[900px] overflow-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {format(parseISO(dateIso), "EEEE d LLLL yyyy", { locale: fr })}
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-neutral-100 px-3 py-1.5 text-sm hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                Fermer
              </button>
            </div>

            <div className="space-y-4">
              {items.length === 0 && (
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  Aucun élément pour cette date.
                </div>
              )}

              {items
                .sort((a, b) => a.platform.localeCompare(b.platform))
                .map((it, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                        <span className="text-xl">
                          <PlatformIcon name={it.platform} />
                        </span>
                        <span className="font-medium">{it.platform}</span>
                        {it.tag && (
                          <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                            {it.tag}
                          </span>
                        )}
                      </div>
                      {it.notes && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {it.notes}
                        </span>
                      )}
                    </div>

                    <ul className="ml-7 list-disc text-sm text-neutral-800 dark:text-neutral-200">
                      {it.ideas?.length ? (
                        it.ideas.map((idea, i) => (
                          <li key={i} className="py-0.5">
                            {idea}
                          </li>
                        ))
                      ) : (
                        <li className="opacity-60">(Aucune alternative)</li>
                      )}
                    </ul>
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
