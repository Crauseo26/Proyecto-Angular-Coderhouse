import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {UsersState} from "../../models/users.state.model";

export const usersSelector = (state: AppState) => state.users;

export const loadUsersSelector = createSelector(
  usersSelector,
  (state: UsersState) => state.isLoading
);

export const usersListSelector = createSelector(
  usersSelector,
  (state: UsersState) => state.users
);
