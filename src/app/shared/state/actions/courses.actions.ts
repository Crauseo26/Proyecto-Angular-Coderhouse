import {createAction, props} from "@ngrx/store";
import {Course} from "../../models/courses.model";

export const loadCourses = createAction(
  '[Courses] load courses'
);

export const loadedCourses = createAction(
  '[Courses] loaded courses',
  props<{ courses: Course[] }>()
)
