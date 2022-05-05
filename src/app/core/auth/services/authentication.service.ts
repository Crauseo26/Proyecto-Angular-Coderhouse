import { Injectable } from '@angular/core';
import {StudentService} from "../../../shared/services/student.service";
import {Student} from "../../../shared/models/student.model";
import {BehaviorSubject, find, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedStatus = new BehaviorSubject<boolean>(false);
  public loggedStatusChange = this.loggedStatus.asObservable();

  constructor(private studentService: StudentService, private snackBar: MatSnackBar) { }

  public onLogin(email: string, password: string): Observable<Student | undefined>{
    return this.studentService.get().pipe(
      map((students: Student[])=>{
        return students.find(student=> student.email === email && student.password === password)
      })
    );
  }

  public getLoggedStudent(): string {
    const loggedStudent= localStorage.getItem('loggedIn') || '';
    return loggedStudent;
  }

  public logOut(): void {
    localStorage.removeItem('loggedIn');
    this.loggedStatus.next(false);
  }
}
