import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthenticationService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  public validateRequired(requiredControl: string): boolean {
    return this.loginForm.controls[requiredControl].hasError('required');
  }

  public togglePasswordVisibility(): void{
    this.isVisible = !this.isVisible;
  }

  onLogIn() {
    const formValue = this.loginForm.value;
    this.authService.onLogin(formValue.email, formValue.password);
    this.authService.loggedStatusChange.subscribe(change =>{
      if(change){
        this.loginForm.controls['email'].setValue('');
        this.loginForm.controls['password'].setValue('');
        this.snackBar.open('Login Successful!!', 'close', {verticalPosition: "top", duration: 1500, horizontalPosition: 'center'})
        setTimeout(() => {
          this.router.navigate(['/Students'])
        },
          1500);

      }
    })
  }
}
