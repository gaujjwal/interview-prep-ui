export interface SearchQuestionsRequest {
  roleId: number | null;

  experienceLevelId: number | null;

  skillIds: number[];

  companyId: number | null;
}