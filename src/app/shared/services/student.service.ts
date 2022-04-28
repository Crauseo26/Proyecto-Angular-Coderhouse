import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Student} from "../../features/students/student-table/student-table-datasource";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MOCK_API_BASE_ROUTE} from "../constants/API.services";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentEndpoint = 'Student';
  private queryRoute: string;

  constructor(private http: HttpClient) {
    this.queryRoute = `${MOCK_API_BASE_ROUTE}/${this.studentEndpoint}`;
  }

  public get(): Observable<Student[]> {
    return this.http.get<Student[]>(this.queryRoute).pipe(catchError(this.handleError));
  }

  public create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.queryRoute, student).pipe(catchError(this.handleError));
  }

  public update(student: Student): Observable<Student>{
    const updateQueryRoute = this.queryRoute.concat('/', student.id.toString());
    return this.http.put<Student>( updateQueryRoute, student).pipe(catchError(this.handleError));
  }

  public delete(studentId: number): Observable<void>{
    const deleteQueryRoute = this.queryRoute.concat('/', studentId.toString());
    return this.http.delete<void>(deleteQueryRoute).pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Frontend Error:', error.error.message)
    }else{
      console.warn('Backend Error', error.status, error.message)
    }

    return throwError(() => 'HTTP Request Error:');

  }
}
