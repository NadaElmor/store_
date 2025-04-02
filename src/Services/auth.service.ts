import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7091/api/account';  
  private http = inject(HttpClient);

  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  get isAuthenticated$(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.authStatus.next(true);
      })
    );
  }

  register(user: { name: string; email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.authStatus.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
