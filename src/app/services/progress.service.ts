import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgressItem } from '../models/Progress/progress-item.model';
import { ProgressStatus } from '../models/Progress/progress-status.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    `${environment.apiUrl}/api/progress`;

  // Current user's progress (user comes from the JWT)
  getMyProgress(): Observable<ProgressItem[]> {
    return this.http.get<ProgressItem[]>(this.baseUrl);
  }

  // Create or update progress for one question
  saveProgress(
    questionId: number,
    status: ProgressStatus
  ): Observable<ProgressItem> {
    return this.http.post<ProgressItem>(this.baseUrl, {
      questionId,
      status
    });
  }
}