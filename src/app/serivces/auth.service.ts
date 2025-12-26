import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly ssoBackendUrl = environment.ssoBackendApi;

  private userSubject = signal<{
    authenticated: boolean;
    user?: IUser;
  }>({ authenticated: false });

  public userSubjectOneSignal = this.userSubject.asReadonly();

  constructor() {}

  checkAuthenticationStatus() {
    return this.http
      .get<{
        authenticated: boolean;
        hasJwt?: boolean;
        hasRefreshToken?: boolean;
      }>(`${this.ssoBackendUrl}/api/auth/auth-status`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          // Update signal globally
          this.userSubject.set({
            authenticated: response.authenticated,
          });
        })
      );
  }

  getUserProfile(): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.ssoBackendUrl}/api/auth/user-profile`, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => this.userSubject.set({ authenticated: true, user })),
        catchError(() => {
          this.userSubject.set({ authenticated: false });
          return of(undefined as any);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(
        `${this.ssoBackendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap(() => this.clearAuth()),
        catchError(() => {
          this.clearAuth();
          return of(null);
        })
      );
  }

  clearAuth(): void {
    this.userSubject.set({ authenticated: false });
  }

  isAuthenticated(): boolean {
    return this.userSubject().authenticated === true;
  }

  getUser(): IUser | undefined {
    return this.userSubject().user;
  }

  setUser(user: IUser): void {
    this.userSubject.set({ authenticated: true, user });
  }
}
