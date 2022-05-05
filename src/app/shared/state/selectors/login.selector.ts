import { createSelector } from "@ngrx/store";
import {AppState} from "../app.state";
import {SessionState} from "../../models/session-state.model";


export const sessionSelector = (state: AppState) => state.session;

export const activeSessionSelector = createSelector(
  sessionSelector,
  (state: SessionState) => state
);
