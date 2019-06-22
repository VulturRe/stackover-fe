import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { IToken, IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn$ = new BehaviorSubject(UserService.isLoggedIn());
  isLoggedOut$ = new BehaviorSubject(UserService.isLoggedOut());

  constructor(private http: HttpClient,
              private router: Router) { }

  private readonly baseUrl = '/api/user';

  private static setSession(authResult: IToken) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  static getExpiration() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return moment(expiresAt);
  }

  static isLoggedIn(): boolean {
    return moment().isBefore(UserService.getExpiration());
  }

  static isLoggedOut(): boolean {
    return !UserService.isLoggedIn();
  }

  register(user: IUser) {
    return this.http.post<IUser>(`${this.baseUrl}/register`, user)
      .pipe(
        shareReplay()
      );
  }

  login(user: IUser) {
    return this.http.post<IToken>(`${this.baseUrl}/auth`, user)
      .pipe(
        tap(res => {
          UserService.setSession(res);
          this.isLoggedIn$.next(true);
          this.isLoggedOut$.next(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.isLoggedIn$.next(false);
    this.isLoggedOut$.next(true);
    this.router.navigate(['/login']);
  }

  restoreBegin(login: string) {
    return this.http.post(`${this.baseUrl}/restore-begin`, { login }, { responseType: 'text' });
  }

  restoreEnd(token: string, password: string) {
    return this.http.post(`${this.baseUrl}/restore-end`, { token, password }, { responseType: 'text' });
  }

  checkRestoreToken(token: string) {
    return this.http.post<boolean>(`${this.baseUrl}/check-token`, { token });
  }
}
