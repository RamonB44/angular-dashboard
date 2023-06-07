import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/enviroment';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/User/User'
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

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/auth/login/`, {
        email,
        password,
      })
      .pipe(
        tap((user: any) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(new User(0,"","","","",new UserData("","","",new UserSettings({},{},false),[]),new Date()));
  }

  public isAuthenticated():  boolean {
    // console.log(user.getExpDate())
    try {
      const expiresAt = Date.parse(this.currentUserValue.expDate.toString())
      if (new Date().getTime() < expiresAt) {
        // Variable is still valid, use the value
        // console.log("session valida");
        return true;

      } else {
        // Variable has expired, remove it from localStorage
        // console.log("session invalida");
        return false;
      }
    } catch (err) {
      return ;
    }
  }

  public isAuthenticatedOrRefresh(): Observable<boolean>  {
    try {
      const expiresAt = Date.parse(this.currentUserValue.expDate.toString())
      if (new Date().getTime() < expiresAt) {
        // Variable is still valid, use the value
        console.log("session aun valida");
        return of(true);
      } else {
        // Variable has expired, remove it from localStorage
        return this.http.post(`${environment.apiUrl}/auth/refresh-token/`, {}).pipe(
          map(() => true), // Return true if the request is successful
          catchError(() => of(false)) // Return false if there is an error
        );
      }
    } catch (err) {
      return of(false);
    }
  }
}
