import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { User, UserF } from './model/AuthModel';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  signup(user: User) {
    return this.http.post(environment.URL + '/user/signup', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  login(email, password, passwordConfirm) {
    return this.http
      .post<User>(
        `${environment.URL}/user/login`,
        { email, password, passwordConfirm },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          return user;
        })
      );
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  logout() {}
}
