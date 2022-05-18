import {createAction, props} from "@ngrx/store";
import {Student} from "../../models/student.model";

export const loadStudents = createAction(
  '[Students] load student'
);

export const loadedStudents = createAction(
  '[Students] loaded student',
  props<{students: Student[]}>()
)
