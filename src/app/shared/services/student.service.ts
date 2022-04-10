import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Student, STUDENT_DATA} from "../../components/content/student-table/student-table-datasource";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private student: Student = {
    absences: 0,
    address: "",
    average: 0,
    birthday: new Date(),
    email: "",
    firstName: "",
    gender: "",
    id: 0,
    lastName: "",
    phone: ""
  };


  public students = new BehaviorSubject<Student[]>(STUDENT_DATA);
  public studentsChange = this.students.asObservable();

  constructor() { }

  public addStudent(input: Student): void{
    console.log('addStudent called');
    let Students = this.getStudents();
    Students.push(input);
    this.students.next(Students);
  }

  public getStudents(): Student[]{
    return this.students.value;
  }
}
