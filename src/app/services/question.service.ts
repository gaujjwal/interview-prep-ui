import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = `${environment.apiUrl}/api/questions`;

  constructor(private http: HttpClient) {}

  getQuestions() {

    

    return this.http.get<any[]>(
      this.apiUrl
    );
  }
  getProgress(userId: string) {


  return this.http.get<any[]>(
    `${this.apiUrl}/${userId}`
  );
}
getQuestionsByCategory(category: string) {

  return this.http.get<any[]>(
    `${this.apiUrl}?category=${category}`
  );
}
getFilteredQuestions(
  category: string,
  search: string
) {
  return this.http.get<any[]>(
    `${this.apiUrl}?category=${category}&search=${search}`
  );
}
}