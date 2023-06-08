import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/enviroment'
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/User/User';
import { UserData } from '../model/User/UserData';
import { UserSettings } from '../model/User/UserSettings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get the current user value as an observable.
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Login the user with the provided email and password.
   * @param email The user's email.
   * @param password The user's password.
   * @returns An observable with the user data.
   */
  login = (email: string, password: string) =>
    this.http
      .post(`${environment.apiUrl}/auth/login/`, { email, password })
      .pipe(
        tap((user: any) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );

  /**
   * Logout the current user.
   */
  logout = () => {
    localStorage.removeItem('user');
    this.currentUserSubject.next(
      new User(
        0,
        '',
        '',
        '',
        '',
        new UserData('', '', '', new UserSettings({}, {}, false), []),
        new Date()
      )
    );
  };

  /**
   * Check if the user is authenticated.
   * @returns True if the user is authenticated, false otherwise.
   */
  isAuthenticated = (): boolean => {
    try {
      const expiresAt = Date.parse(this.currentUserValue.expDate.toString());
      return new Date().getTime() < expiresAt;
    } catch {
      return false;
    }
  };

  /**
   * Resolve the authentication status and refresh the token if needed.
   * @returns An observable with a boolean indicating if the user is authenticated or the token was refreshed.
   */
  private resolveAuthentication = (): Observable<boolean> => {
    try {
      const expiresAt = Date.parse(this.currentUserValue.expDate.toString());
      if (new Date().getTime() < expiresAt) {
        return of(true);
      } else {
        return this.http.post(`${environment.apiUrl}/auth/refresh-token/`, {}).pipe(
          tap((data: any) => {
            this.currentUserValue.expDate = data.expDate;
            localStorage.setItem('user', JSON.stringify(this.currentUserValue));
          }),
          map(() => true),
          catchError(() => of(false))
        );
      }
    } catch {
      return of(false);
    }
  };

  /**
   * Check if the user is authenticated or perform token refresh if needed.
   * @returns A promise with a boolean indicating if the user is authenticated or the token was refreshed.
   */
  isAuthenticatedOrRefresh = (): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
      this.resolveAuthentication().subscribe({
        next: (data) => resolve(data),
        error: () => resolve(false),
      });
    });
}
