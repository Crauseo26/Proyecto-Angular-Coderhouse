import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {activeSessionSelector} from "../../../shared/state/selectors/login.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private snackBar: MatSnackBar, private store: Store<AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isSessionActive = false;

    this.store.select(activeSessionSelector).subscribe(session =>{
      isSessionActive = session.isActive;
    })

    console.log(isSessionActive);

    if (isSessionActive) {
      return true;
    } else {
      this.snackBar.open('Please, log in to gain access to this function', 'close', {
        verticalPosition: "top",
        horizontalPosition: 'center',
        duration: 2500
      });
      return this.router.navigate(['/Home'], {queryParams: {returnUrl: state.url}});
    }
  }
}
