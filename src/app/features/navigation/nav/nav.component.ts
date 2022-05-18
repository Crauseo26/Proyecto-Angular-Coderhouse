import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {closeSession} from "../../../shared/state/actions/session.actions";
import {activeSessionSelector} from "../../../shared/state/selectors/login.selector";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public isLoggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthenticationService,
              private router: Router, private store: Store<AppState>,
              private snackBar: MatSnackBar
  ) {
    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isLoggedIn = session.isActive;
    });
  }

  public onLogOut(): void {
    this.store.dispatch(closeSession());
    this.authService.removeSession();
    this.snackBar.open('Logout Successful, see you later 🤗', 'close', {verticalPosition: "top", duration: 1500, horizontalPosition: 'center'})
    setTimeout(() => { this.router.navigate(['/Home']) },1500);
  }
}
