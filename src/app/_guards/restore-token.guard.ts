import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestoreTokenGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = route.queryParamMap.get('token');
    if (!token) { this.router.navigate(['/']); return false; }

    return this.userService.checkRestoreToken(token)
      .pipe(
        tap(res => {
          if (!res) { this.router.navigate(['/']); }
        })
      );
  }
}
