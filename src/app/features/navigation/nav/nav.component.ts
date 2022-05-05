import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthenticationService} from "../../../core/auth/services/authentication.service";
import {Student} from "../../../shared/models/student.model";
import {Router} from "@angular/router";

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

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticationService, private router: Router) {
   this.authService.loggedStatusChange.subscribe(value =>{
      this.isLoggedIn = value;
    });

    if(this.authService.getLoggedStudent() === ''){
      this.isLoggedIn = false;
    }else{
      this.isLoggedIn = true;
    }
  }

  public onLogOut(): void {
  this.authService.logOut();
  this.router.navigate(['/Home']);
  }
}
