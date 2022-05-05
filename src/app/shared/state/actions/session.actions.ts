import { createAction, props } from "@ngrx/store";
import {UserLogin} from "../../models/user-login.model";

export const createSession = createAction(
  '[Auth Login] created session',
  props<{ currentUser: UserLogin }>()
);

export const closeSession = createAction(
  '[Auth Login] closed session',
);
