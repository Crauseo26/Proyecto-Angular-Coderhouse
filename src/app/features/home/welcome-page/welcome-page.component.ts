import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {createSession} from "../../../shared/state/actions/session.actions";
import {UserLogin} from "../../../shared/models/user-login.model";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


  public isVisible = false;

  constructor(private authService: AuthenticationService, private snackBar: MatSnackBar, private router: Router, private store: Store<AppState>,) {
  }

  public ngOnInit(): void {
  }

  public validateRequired(requiredControl: string): boolean {
    return this.loginForm.controls[requiredControl].hasError('required');
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }

  public onLogIn(): void {
    const formValue = this.loginForm.value;
    this.authService.onLogin(formValue.email, formValue.password).subscribe(student =>{
      if(student){
        const loggedStudent: UserLogin = {firstName: student.firstName, lastName: student.lastName, email: student.email, password: student.password, isAdmin: student.isAdmin}
        this.store.dispatch(createSession({currentUser: loggedStudent}))
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
}
