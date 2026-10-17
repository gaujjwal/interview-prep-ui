export interface ExperienceLevelOption {
  id: number;
  name: string;

  minYears: number | null;
  maxYears: number | null;

  sortOrder: number;
}