import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {CourseState} from "../../models/course.state.model";

export const coursesSelector = (state: AppState) => state.courses;

export const loadCoursesSelector = createSelector(
  coursesSelector,
  (state: CourseState) => state.isLoading
);

export const coursesListSelector = createSelector(
  coursesSelector,
  (state: CourseState) => state.courses
);
