import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthSession {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authService.isAuthenticatedOrRefresh();
    if (isAuthenticated) {
      return true;
    }
    return this.router.parseUrl('/auth/login');
  }
}

/**
 * Show the main page if exists an open work execution or if exists a session
 * saved in the cookies.
 * @param route
 * @param state
 * @returns
 */
export const AuthGuard : CanActivateFn =  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthSession).canActivate();
};
