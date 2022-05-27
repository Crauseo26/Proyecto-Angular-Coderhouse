import {Student} from "./student.model";

export interface StudentState {
  isLoading: boolean;
  isCreating: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  students: Student[];

}
