import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  baseUrl: string = "http://localhost:4000/api/auth";

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(loginData: { usernameOrEmail: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, loginData, this.getHttpOptions());
  }

  signup(signupData: { firstName: string; lastName: string; username: string; email: string; password: string; phoneNumber: string; genre: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, signupData, this.getHttpOptions());
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/activate?token=${token}`);
  }

  requestResetPassword(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/request-reset-password?email=${email}`, this.getHttpOptions());
  }

  resetPassword(resetData: { token: string; newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetData, this.getHttpOptions());
  }

  createContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/contacts`, contact, this.getHttpOptions());
  }  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, this.getHttpOptions());
  }
}
