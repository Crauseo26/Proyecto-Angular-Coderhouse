import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserLogin} from "../../../shared/models/user-login.model";
import {User} from "../../../shared/models/user.model";
import {UsersService} from "../../../shared/services/users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UsersService) { }

  public onLogin(username: string, password: string): Observable<User | undefined>{
    return this.userService.get().pipe(
      map((users: User[])=>{
        return users.find(user=> user.username === username && user.password === password)
      })
    );
  }

  public saveSession(loggedStudent: UserLogin): void {
    localStorage.setItem('currentUser', JSON.stringify(loggedStudent));
  }

  public isSessionSaved(): boolean {
    const loggedStudent = localStorage.getItem('currentUser');
    return !!loggedStudent;
  }

  public getSavedSession(): UserLogin {
    const savedSession = localStorage.getItem('currentUser');
    return savedSession ? JSON.parse(savedSession) : null;
  }

  public removeSession(): void{
    localStorage.removeItem('currentUser');
  }
}
