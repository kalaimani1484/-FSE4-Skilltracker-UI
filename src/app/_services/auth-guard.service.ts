import { Injectable } from '@angular/core';
import { AccountService } from './account.service'
import { Router, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  IsActiveUser = false;
  constructor(private authService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.validateUser()) {
      this.IsActiveUser = true;
      //console.log('login success');
      return true;
    }
    else {
      //console.log("Please login")
      this.IsActiveUser = false;
      this.authService.logout();
      if (localStorage.getItem('token') == null || localStorage.getItem('token')=='')
        this.router.navigate(['login']);
      else
        this.router.navigate(['login']);

    }
  }
}
