import {createAction, props} from "@ngrx/store";
import {Student} from "../../models/student.model";

export const loadStudents = createAction(
  '[Students] load student'
);

export const loadedStudents = createAction(
  '[Students] loaded student',
  props<{students: Student[]}>()
);

export const createStudent = createAction(
  '[Students] create student',
  props<{ student: Student}>()
);

export const studentCreated = createAction(
  '[Students] student created'
);

export const editStudent = createAction(
  '[Students] edit student',
  props<{ student: Student}>()
);

export const studentEdited = createAction(
  '[Students] student edited'
);

export const deleteStudent = createAction(
  '[Students] delete student',
  props<{ student: Student}>()
);

export const studentDeleted = createAction(
  '[Students] student deleted'
);
