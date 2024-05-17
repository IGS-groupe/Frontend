import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/auth.models'; // Assuming User model exists

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:4000/api/users";

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // Get user by id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Get users by role (assuming a similar endpoint is available)
  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/role/${role}`, { headers: this.getAuthHeaders() });
  }

  // Create new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, { headers: this.getAuthHeaders() });
  }

  // Update user
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  // Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Disable user
  toggleUserActive(id: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/disable/${id}`, null, { headers: this.getAuthHeaders() });
  }
  changePassword(usernameOrEmail: string, password: string, newPassword: string): Observable<any> {
    const body = {
      usernameOrEmail: usernameOrEmail,
      password: password,
      newPassword: newPassword
    };
    return this.http.put<any>(`${this.baseUrl}/change-password`, body, { headers: this.getAuthHeaders() });
  }

  logout(): Observable<string> {  // Expecting a response of type string
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Directly fetching the token for logout
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'  // Handling response as plain text
    };

    return this.http.post<string>(`${this.baseUrl.replace('/users', '/auth')}/logout`, {}, httpOptions);
  }
}
