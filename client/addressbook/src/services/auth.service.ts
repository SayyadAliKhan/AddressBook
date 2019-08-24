import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    private _cookie: CookiesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (state.url === '/' || state.url === '/login') {
      if (this._cookie.getCookie('access_token')) {
        this.router.navigate(['/profiles']);
        return false;
      }
        return true;
    } else {
      if (this._cookie.getCookie('access_token')) {
        return true;
      }
      this.router.navigate(['/login']);
        return false;
    }
  }


}
