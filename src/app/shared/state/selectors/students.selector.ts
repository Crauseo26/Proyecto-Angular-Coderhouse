import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {StudentState} from "../../models/student.state.model";

export const studentsSelector = (state: AppState) => state.students;

export const studentsListSelector = createSelector(
  studentsSelector,
  (state: StudentState) => state
);
