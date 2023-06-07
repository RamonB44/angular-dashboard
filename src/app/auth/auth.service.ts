import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/enviroment';
import { map, tap } from 'rxjs/operators';
import { User } from '../model/User/User'
import { UserData } from '../model/User/UserData';
import { UserSettings } from '../model/User/UserSettings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))['user']
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
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(new User(0,"","","","",new UserData("","","",new UserSettings({},{},false),[]),new Date()));
    this.isLoggedIn = false;
  }

  public isAuthenticated(): boolean {
    console.log(this.currentUserValue.expDate)
    // console.log(user.getExpDate())
    // const expiresAt = this.currentUserValue.expDate.getTime();
    // if (new Date().getTime() < expiresAt) {
    //   // Variable is still valid, use the value
    //   console.log("session valida");
    // } else {
    //   // Variable has expired, remove it from localStorage
    //   console.log("session invalida");
    // }
    // console.log(this.isLoggedIn)
    return true;
  }

  public isAuthenticatedOrRefresh(): boolean {
    console.log(this.currentUserSubject.value);
    return true;
  }
}
