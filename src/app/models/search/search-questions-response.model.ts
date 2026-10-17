import { SearchQuestionResult } from './search-question-result.model';

export interface SearchQuestionsResponse {
  totalCount: number;

  questions: SearchQuestionResult[];
}