import {UsersState} from "../../models/users.state.model";
import {createReducer, on} from "@ngrx/store";
import {loadedUsers, loadUsers} from "../actions/user.action";

export const initialUserState: UsersState = {
  isLoading: false,
  users: []
}

export const userReducer = createReducer(
  initialUserState,
  on(loadUsers, (state) =>{
    return {...state, isLoading: true, users: initialUserState.users}
  }),

  on(loadedUsers, (state, {users})=>{
    return {...state, isLoading: false, users}
  })
);
