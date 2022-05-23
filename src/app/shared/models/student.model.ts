import {Course} from "./courses.model";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: Date;
  address: string;
  phone: string;
  average: number;
  absences: number;
  profilePhoto: string;
  Courses: Course[];
}
