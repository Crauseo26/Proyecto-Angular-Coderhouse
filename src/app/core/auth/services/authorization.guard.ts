import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {activeSessionSelector} from "../../../shared/state/selectors/users.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  private isSessionActive!: boolean;

  constructor(private router: Router, private snackBar: MatSnackBar, private store: Store<AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isSessionActive = session.isActive;
    })

    if (this.isSessionActive) {
      return true;
    } else {
      this.snackBar.open('Please, log in to gain access to this function', 'close', {
        verticalPosition: "top",
        horizontalPosition: 'center',
        duration: 2500
      });
      return this.router.navigate(['/Home']);
    }
  }
}
