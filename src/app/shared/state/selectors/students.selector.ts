import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {StudentState} from "../../models/student.state.model";

export const studentsSelector = (state: AppState) => state.students;

export const loadStudentsSelector = createSelector(
  studentsSelector,
  (state: StudentState) => state.isLoading
);

export const studentsListSelector = createSelector(
  studentsSelector,
  (state: StudentState) => state.students
);

export const creatingStudentSelector = createSelector(
  studentsSelector,
  (state: StudentState) => state.isCreating
);

export const editingStudentSelector = createSelector(
  studentsSelector,
  (state: StudentState) => state.isEditing
);

export const deletingStudentSelector = createSelector(
  studentsSelector,
  (state: StudentState) => state.isDeleting
);
