import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/' || state.url === '/login') {
      if (localStorage.getItem('access_token')) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (localStorage.getItem('access_token')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

}
