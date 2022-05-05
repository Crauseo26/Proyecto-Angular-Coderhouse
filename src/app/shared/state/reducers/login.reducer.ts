import { createReducer, on } from "@ngrx/store";
import {SessionState} from "../../models/session-state.model";
import {closeSession, createSession} from "../actions/session.actions";

export const initialState: SessionState = {
  isActive: false,
  currentUser: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false
  }
}

export const loginReducer = createReducer(
  initialState,
  on(createSession, (state, {currentUser}) => {
      return { ...state, isActive: true, currentUser }
    }
  ),

  on(closeSession, (state)=>{
    return { ...state, isActive: false, currentUser: initialState.currentUser}
  })

);
