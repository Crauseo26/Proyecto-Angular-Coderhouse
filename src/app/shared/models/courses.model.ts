import {Teacher} from "./teacher.model";
import {Lecture} from "./lecture.model";
import {Student} from "./student.model";

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
