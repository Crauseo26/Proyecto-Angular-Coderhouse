import {Student} from "./student.model";
import {Course} from "./courses.model";

export interface Enrollment {
  id: number,
  date: Date,
  status: string,
  Student: Student,
  Course: Course
}
