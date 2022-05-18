import { ActionReducerMap } from "@ngrx/store";
import {loginReducer} from "./reducers/login.reducer";
import {SessionState} from "../models/session-state.model";
import {StudentState} from "../models/student.state.model";
import {studentReducer} from "./reducers/student.reducer";

export interface AppState {
  session: SessionState,
  students: StudentState
};

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  session: loginReducer,
  students: studentReducer
}
