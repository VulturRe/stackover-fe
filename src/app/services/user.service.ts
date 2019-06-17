import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { shareReplay, tap } from 'rxjs/operators';
import { IToken, IUser } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) { }

  private readonly baseUrl = '/api/user/';

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
    return this.http.post<IUser>(`${this.baseUrl}register`, user)
      .pipe(
        shareReplay()
      );
  }

  login(user: IUser) {
    return this.http.post<IToken>(`${this.baseUrl}auth`, user)
      .pipe(
        tap(res => UserService.setSession(res))
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }
}
