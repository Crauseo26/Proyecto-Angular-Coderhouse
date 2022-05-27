import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const loadUsers = createAction(
  '[Users] load users'
);

export const loadedUsers = createAction(
  '[Users] loaded users',
  props<{ users: User[] }>()
)
