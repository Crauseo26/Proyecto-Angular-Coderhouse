import {Component, OnInit} from '@angular/core';
import {AppState} from "../../../../shared/state/app.state";
import {Store} from "@ngrx/store";
import {activeSessionSelector} from "../../../../shared/state/selectors/users.selector";
import {closeSession} from "../../../../shared/state/actions/session.actions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../../core/auth/services/authentication.service";
import {Router} from "@angular/router";

interface menuOption {
  icon: string,
  label: string
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public isAdmin = false;
  public isLoggedIn = false;
  public menuOptions: menuOption[] = [
    {icon: 'home', label: 'Home'},
    {icon: 'school', label: 'Students'},
    {icon: 'class', label: 'Courses'}
  ]

  constructor(private store: Store<AppState>) {
    this.store.select(activeSessionSelector).subscribe(state => {
      this.isAdmin = state.currentUser.isAdmin;
      this.isLoggedIn = state.isActive;
    });
  }

  ngOnInit(): void {
  }

}
