import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SearchOption } from '../models/search/search-option.model';
import { ExperienceLevelOption } from '../models/search/experience-level-option.model';
import { SearchQuestionsRequest } from '../models/search/search-questions-request.model';
import { SearchQuestionsResponse } from '../models/search/search-questions-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    `${environment.apiUrl}/api/search`;


  getRoles(): Observable<SearchOption[]> {

    return this.http.get<SearchOption[]>(
      `${this.baseUrl}/options/roles`
    );

  }


  getExperienceLevels():
    Observable<ExperienceLevelOption[]> {

    return this.http.get<ExperienceLevelOption[]>(
      `${this.baseUrl}/options/experience-levels`
    );

  }


  getSkills(): Observable<SearchOption[]> {

    return this.http.get<SearchOption[]>(
      `${this.baseUrl}/options/skills`
    );

  }


  getCompanies(): Observable<SearchOption[]> {

    return this.http.get<SearchOption[]>(
      `${this.baseUrl}/options/companies`
    );

  }


  searchQuestions(
    request: SearchQuestionsRequest
  ): Observable<SearchQuestionsResponse> {

    return this.http.post<SearchQuestionsResponse>(
      `${this.baseUrl}/questions`,
      request
    );

  }
}