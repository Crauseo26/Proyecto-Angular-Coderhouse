import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private snackBar: MatSnackBar) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('loggedIn')){
      return true;
    }

    this.snackBar.open('Please, log in to gain access to this function', 'close', {verticalPosition: "top", horizontalPosition: 'center', duration: 2500});

    this.router.navigate(['/Home'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
