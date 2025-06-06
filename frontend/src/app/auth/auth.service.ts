import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {API_BASE_URL} from '../../lib/api-base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private baseUrl = API_BASE_URL;
  private tokenKey = 'jwt_token';
  private loggedIn = signal(false);
  private userRole = signal<string | null>(null);

  constructor() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.loggedIn.set(true);
      this.extractRoleFromToken(token);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<{token: string}>(`${this.baseUrl}/auth/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.loggedIn.set(true);
        this.extractRoleFromToken(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.set(false);
    this.userRole.set(null);
  }

  private extractRoleFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole.set(payload.role);
    } catch (e) {
      this.userRole.set(null);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.loggedIn());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.loggedIn();
  }

  getUserRole(): string | null {
    return this.userRole();
  }

  isAdmin(): boolean {
    return this.userRole() === 'ADMIN';
  }

  isCustomer(): boolean {
    return this.userRole() === 'CUSTOMER';
  }
}
