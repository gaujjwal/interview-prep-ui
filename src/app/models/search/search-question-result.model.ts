import { SearchOption } from './search-option.model';

export interface SearchQuestionResult {
  id: number;

  title: string;

  answer: string;

  roleId: number;
  role: string;

  categoryId: number;
  category: string;

  experienceLevelId: number;
  experienceLevel: string;

  skills: SearchOption[];

  companies: SearchOption[];
}