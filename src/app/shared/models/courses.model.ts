import {Student} from "../../features/students/student-table/student-table-datasource";
import {Teacher} from "./teacher.model";
import {Lecture} from "./lecture.model";

export interface Course {
  id: number,
  name: string,
  startPeriod: Date,
  endPeriod: Date,
  capacity: number,
  description: string,
  teacher: Teacher | undefined,
  students: Student[],
  lectures: Lecture[]
}
