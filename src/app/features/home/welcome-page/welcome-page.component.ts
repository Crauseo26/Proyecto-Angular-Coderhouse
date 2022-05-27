import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {createSession} from "../../../shared/state/actions/session.actions";
import {UserLogin} from "../../../shared/models/user-login.model";
import {activeSessionSelector} from "../../../shared/state/selectors/users.selector";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  public isSessionActive = false;
  public isVisible = false;

  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService, private snackBar: MatSnackBar, private router: Router, private store: Store<AppState>,) {
    if(this.authService.isSessionSaved()){
      const savedSession = this.authService.getSavedSession()
      this.store.dispatch(createSession({currentUser: savedSession}));
      this.setSessionStatus();
    }else{
      this.setSessionStatus();
    }
  }

  public ngOnInit(): void {}

  public validateRequired(requiredControl: string): boolean {
    return this.loginForm.controls[requiredControl].hasError('required');
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }

  public onLogIn(): void {
    const formValue = this.loginForm.value;
    this.authService.onLogin(formValue.username, formValue.password).subscribe(user =>{
      if(user){
        const loggedUser: UserLogin = {username: user.username, isAdmin: user.isAdmin};
        this.store.dispatch(createSession({currentUser: loggedUser}));
        this.authService.saveSession(loggedUser);
        this.snackBar.open('Login Successful!!', 'close', {verticalPosition: "top", duration: 1500, horizontalPosition: 'center'})
        setTimeout(() => { this.router.navigate(['/Students']) },1500);
      }else{
        this.snackBar.open('Wrong credentials, please try again.', 'close', {
          verticalPosition: "top",
          horizontalPosition: 'center',
          duration: 2500
        });
      }
    })
  }

  private setSessionStatus(): void {
    this.store.select(activeSessionSelector).subscribe(session =>{
      this.isSessionActive = session.isActive;
    })
  }
}
