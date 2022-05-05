import { ActionReducerMap } from "@ngrx/store";
import {loginReducer} from "./reducers/login.reducer";
import {SessionState} from "../models/session-state.model";

export interface AppState {
  session: SessionState,
};

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  session: loginReducer
}
