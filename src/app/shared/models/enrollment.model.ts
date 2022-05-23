import {Student} from "./student.model";
import {Course} from "./courses.model";

export interface Enrollment {
  id: number | undefined,
  date: Date | undefined,
  status: string,
  Student: Student,
  Course: Course
}
