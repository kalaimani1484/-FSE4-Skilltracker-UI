import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AccessToken, User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<AccessToken>;
  public user: Observable<AccessToken>;
  Expires: any;
  Token: string;
  IsLoggedIn: boolean;
  constructor(
    private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<AccessToken>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): AccessToken {
      return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<AccessToken>(`${environment.apiUrl}/skill-tracker/api/auth/token`, { username, password })
         .pipe(map(user => {
             // store user details and jwt token in local storage to keep user logged in between page refreshes
             localStorage.setItem('user', JSON.stringify(user));
             localStorage.setItem('token', user.token);
             localStorage.setItem('expires', user.expires);
             this.userSubject.next(user);
             return user;
         }));
         
 }

 logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('expires');
  this.userSubject.next(null);
  this.router.navigate(['/']);
}
validateUser() {
  this.Expires = new Date(localStorage.getItem("expires"));
  
  this.Token = localStorage.getItem("token");

  let currentTime = new Date();
  if ((this.Token != null && this.Token.trim() != '') && (this.Expires != undefined
    && this.Expires.getDate() >= currentTime.getDate()
    || this.Expires.getHours() >= currentTime.getHours())
  ) {
    this.IsLoggedIn = true;
    return true;
  }
  else {
    this.IsLoggedIn = false;
    return false;
  }

}

}
