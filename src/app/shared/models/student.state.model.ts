import {Student} from "./student.model";

export interface StudentState {
  isLoading: boolean;
  students: Student[];
}
