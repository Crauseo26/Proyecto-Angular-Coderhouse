import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {EnrollmentState} from "../../models/enrollment.state.model";

export const enrollmentsSelector = (state: AppState) => state.enrollments;

export const enrollmentsListSelector = createSelector(
  enrollmentsSelector,
  (state: EnrollmentState) => state
);
