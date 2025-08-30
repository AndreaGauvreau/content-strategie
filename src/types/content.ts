export type Row = Record<string, string>;
export type Item = {
  date: string;
  platform: string;
  tag?: string;
  ideas: string[];
  notes?: string;
  raw?: Row;
};
