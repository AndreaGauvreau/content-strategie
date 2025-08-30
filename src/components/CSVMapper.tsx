"use client";

import { format } from "date-fns";

export default function CSVMapper({
  csvText,
  setCsvText,
  headers,
  dateCol,
  setDateCol,
  platformCol,
  setPlatformCol,
  tagCol,
  setTagCol,
  notesCol,
  setNotesCol,
}: {
  csvText: string;
  setCsvText: (v: string) => void;
  headers: string[];
  dateCol: string;
  setDateCol: (v: string) => void;
  platformCol: string;
  setPlatformCol: (v: string) => void;
  tagCol: string;
  setTagCol: (v: string) => void;
  notesCol: string;
  setNotesCol: (v: string) => void;
}) {
  const loadDemo = () => {
    const m = format(new Date(), "yyyy-MM");
    const s = `date,platform,tag,Idée 1,Idée 2,Idée 3,Idée 4,notes
${m}-02,LinkedIn,Industry,3 signaux faibles 2025,Marque sous-cotée,Tendances typo,L'IA change-t-elle la DA?,Post
${m}-03,LinkedIn,Brand,Pourquoi Kuartz=joaillier,Avant/Après éclair,Choix couleurs,Étincelle en 48h,Carousel
${m}-05,X,Industry,Thread tendances,Mini-cas under-rated,Typo wars,AI x brand,Thread
${m}-06,Threads,Industry,Thread tendances,Mini-cas under-rated,Typo wars,AI x brand,Thread
${m}-07,Instagram,Medium,Hooks couleur,Audit logo 30s,Grille & rythme,Micro-interactions,Reel
${m}-07,TikTok,Medium,Hooks couleur,Audit logo 30s,Grille & rythme,Micro-interactions,TT
${m}-07,YouTube Shorts,Medium,Hooks couleur,Audit logo 30s,Grille & rythme,Micro-interactions,Short
${m}-09,LinkedIn,Industry,3 marques sous-cotées,Baromètre tendances,Typo hier vs ajd,AI impact,Post
${m}-10,LinkedIn,Offer,Sprint Polish 10j,Étude de cas +X%,Audit offert,Appel à projets,Carousel
`;
    setCsvText(s);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
        Coller votre CSV
      </div>

      <textarea
        className="h-[220px] w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-3 font-mono text-[12px] leading-5 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-700"
        placeholder={`En-têtes: date, platform, tag, Idée 1..N, notes`}
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
      />

      {headers.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <Select
            label="Colonne date"
            value={dateCol}
            setValue={setDateCol}
            options={headers}
          />
          <Select
            label="Colonne plateforme"
            value={platformCol}
            setValue={setPlatformCol}
            options={headers}
          />
          <Select
            label="Colonne tag (optionnel)"
            value={tagCol}
            setValue={setTagCol}
            options={["", ...headers]}
          />
          <Select
            label="Colonne notes (optionnel)"
            value={notesCol}
            setValue={setNotesCol}
            options={["", ...headers]}
          />
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={loadDemo}
          className="rounded-2xl border border-neutral-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
        >
          Charger un exemple
        </button>
      </div>

      <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
        Données sauvegardées en local (localStorage).
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <select
        className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-700"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "—"}
          </option>
        ))}
      </select>
    </label>
  );
}
