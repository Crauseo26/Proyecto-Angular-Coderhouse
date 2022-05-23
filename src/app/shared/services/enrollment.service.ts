import { Injectable } from '@angular/core';
import {MOCK_API_BASE_ROUTE} from "../constants/API.services";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delay, Observable, throwError} from "rxjs";
import {Course} from "../models/courses.model";
import {Enrollment} from "../models/enrollment.model";
import {StudentService} from "./student.service";
import {CoursesService} from "./courses.service";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private coursesEndpoint: string;
  private queryRoute: string;

  constructor(private http: HttpClient, private studentService: StudentService, private courseService: CoursesService) {
    this.coursesEndpoint = 'Enrollment'
    this.queryRoute = `${MOCK_API_BASE_ROUTE}/${this.coursesEndpoint}`;
  }

  public get(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.queryRoute).pipe(catchError(this.handleError), delay(2000));
  }

  public create(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.queryRoute, enrollment).pipe(catchError(this.handleError));
  }

  public delete(enrollId: number): Observable<void>{
    const deleteQueryRoute = this.queryRoute.concat('/', enrollId.toString());
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
