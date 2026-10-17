import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl = `${environment.apiUrl}/api/progress`;

  constructor(private http: HttpClient) { }

  saveProgress(model: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      this.apiUrl,
      model,
      { headers }
    );
  }
  getProgress(userId: string) {

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>(
    `${this.apiUrl}/${userId}`,
    { headers }
  );
}
}
``