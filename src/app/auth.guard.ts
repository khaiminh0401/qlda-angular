import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { AppConst } from './app.const';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private appService: AppService,
    private location: Location,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const isLoggedIn = this.appService.isAuthenticated();
    console.log("islogin",this.location.path(), AppConst.page.login);
    if(!isLoggedIn){
      // this.router.navigate([AppConst.page.login]);
      return false;
    }
    return true;
  }
}
