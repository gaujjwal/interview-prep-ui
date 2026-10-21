import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = `${environment.apiUrl}/api/auth`;
  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      model
    );
  }
  googleLogin(idToken: string) {
  return this.http.post(
    `${this.apiUrl}/google`,
    { idToken }
  );
}
  register(model: any) {

  return this.http.post(
    `${this.apiUrl}/register`,
    model
  );
}
}
