import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private apiUrl = 'http://localhost:4000/api/auth'; // 🔁 Replace with your backend URL

  constructor(private http: HttpClient) {}

  // 🔢 Get total number of users with role ROLE_USER
  getUserCount(): Observable<{ userCount: number }> {
    return this.http.get<{ userCount: number }>(`${this.apiUrl}/users/count-role-user`);
  }

  // 🔬 Get total number of demandes with COMPLETE_RESULTS status
  getCompleteResultDemandesCount(): Observable<{ completeResultsCount: number }> {
    return this.http.get<{ completeResultsCount: number }>(`${this.apiUrl}/demandes/count-complete-results`);
  }
  getUsersWithRoleUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/by-role?role=ROLE_USER`);
  }
}
