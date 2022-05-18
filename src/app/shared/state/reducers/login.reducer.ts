import { createReducer, on } from "@ngrx/store";
import {SessionState} from "../../models/session-state.model";
import {closeSession, createSession} from "../actions/session.actions";

export const initialSessionState: SessionState = {
  isActive: false,
  currentUser: {
    username: '',
    isAdmin: false
  }
}

export const loginReducer = createReducer(
  initialSessionState,
  on(createSession, (state, {currentUser}) => {
      return { ...state, isActive: true, currentUser }
    }
  ),

  on(closeSession, (state)=>{
    return { ...state, isActive: false, currentUser: initialSessionState.currentUser}
  })

);
