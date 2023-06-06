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
          this.isLoggedIn = true;
          console.log(this.isLoggedIn);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(new User(0,"","","","",new UserData("","","",new UserSettings({},{},false),[])));
    this.isLoggedIn = false;
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  isAuthenticatedOrRefresh(): boolean {
    return true;
  }
}
