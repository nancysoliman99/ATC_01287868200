import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'user';
  private apiUrl = 'https://localhost:7207/api/Auth';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setUser(username: string, role: string): void {
    localStorage.setItem(this.userKey, JSON.stringify({ username, role }));
  }

  getUser(): { username: string; role: string } | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user ? user.role === 'Admin' : false;
  }

  register(username: string, email: string, password: string, role: string): Observable<any> {
    const body = { username, email, password, role };
    return this.http.post(`${this.apiUrl}/register`, body).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(username, role);
        }
      })
    );
  }
   isLoggedIn(): boolean {
    return !!this.getToken(); // تحقق من وجود توكن
  }



  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(username, response.role);
        }
      })
    );
  }
}
