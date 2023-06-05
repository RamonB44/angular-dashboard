import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/enviroment';
import { map, tap } from 'rxjs/operators';
import { User } from '../model/User'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') ?? "")
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    // make a http request for authenticated users
    return false;
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((user: any) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}
