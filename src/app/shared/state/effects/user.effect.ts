import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap} from "rxjs";
import {map} from "rxjs/operators";
import {loadedUsers, loadUsers} from "../actions/user.action";
import {UsersService} from "../../services/users.service";

@Injectable()
export class UserEffect{
  loadUserEffect = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    exhaustMap(() => this.userService.get().pipe(
      map(users => loadedUsers({users}))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UsersService
  ){}
}
