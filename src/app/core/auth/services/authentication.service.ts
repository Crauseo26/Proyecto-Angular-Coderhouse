import { Injectable } from '@angular/core';
import {StudentService} from "../../../shared/services/student.service";
import {Student} from "../../../shared/models/student.model";
import {BehaviorSubject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedStatus = new BehaviorSubject<string>('');
  public loggedStatusChange = this.loggedStatus.asObservable();

  constructor(private studentService: StudentService, private snackBar: MatSnackBar) { }

  private setLoggedIn(value: Student){
    localStorage.setItem('loggedIn', JSON.stringify(value));
    this.loggedStatus.next(JSON.stringify(value));
  }

  public onLogin(email: string, password: string): void{
    this.studentService.get().subscribe(students =>{
      let studentExist = students.find(student =>{
        return student.email === email && student.password === password;
      });

      if(studentExist){
        this.setLoggedIn(studentExist);
      }else{
        this.snackBar.open('Wrong Credentials, please try again', 'close', {verticalPosition: "top", horizontalPosition: "center", duration: 2500});
      }
    });
  }

  public getLoggedStudent(): Student {
    return JSON.parse(localStorage.getItem('loggedIn') || '');
  }
}
