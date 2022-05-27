import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  createStudent, deleteStudent,
  editStudent,
  loadedStudents,
  loadStudents,
  studentCreated, studentDeleted,
  studentEdited
} from "../actions/students.actions";
import {exhaustMap, switchMap} from "rxjs";
import {StudentService} from "../../services/student.service";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Student} from "../../models/student.model";

@Injectable()
export class StudentEffect{
  loadStudentsEffect = createEffect(() => this.actions$.pipe(
    ofType(loadStudents),
    exhaustMap(() => this.studentService.get().pipe(
      map(students => loadedStudents({students}))
    ))
  ));

  createStudentEffect = createEffect(() => this.actions$.pipe(
    ofType(createStudent),
    switchMap((action) => this.studentService.create(action.student).pipe(
      map( student => studentCreated())
    ))
  ));

  editStudentEffect = createEffect(() => this.actions$.pipe(
    ofType(editStudent),
    switchMap((action) => this.studentService.update(action.student).pipe(
      map( student => studentEdited())
    ))
  ));

  deleteStudentEffect = createEffect(() => this.actions$.pipe(
    ofType(deleteStudent),
    switchMap((action) => this.studentService.delete(action.student.id).pipe(
      map( student => studentDeleted())
    ))
  ));

  constructor(
    private actions$: Actions,
    private studentService: StudentService
  ){}
}
