import { ProgressStatus } from './progress-status.model';

export interface ProgressItem {
  questionId: number;
  status: ProgressStatus;
  updatedAt: string;
}
