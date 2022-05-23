import {Course} from "./courses.model";

export interface CourseState {
  isLoading: boolean;
  courses: Course[];
}
