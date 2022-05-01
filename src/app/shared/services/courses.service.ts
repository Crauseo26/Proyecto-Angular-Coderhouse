import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MOCK_API_BASE_ROUTE} from "../constants/API.services";
import {catchError, Observable, throwError} from "rxjs";
import {Course} from "../models/courses.model";
import {Student} from "../../features/students/student-table/student-table-datasource";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesEndpoint: string;
  private queryRoute: string;

  constructor(private http: HttpClient) {
    this.coursesEndpoint = 'Course'
    this.queryRoute = `${MOCK_API_BASE_ROUTE}/${this.coursesEndpoint}`;
  }

  public get(): Observable<Course[]> {
      return this.http.get<Course[]>(this.queryRoute);
  }

  public getCorusePhoto(): Observable<any>{
    return this.http.get<any>('https://api.unsplash.com/search/photos?page=1&per_page=25&query=tecnology&client_id=LsRXhs_TYyEvPvxrpu4uqokmhXY6hwxDIdk5ME2EvZc')
  }

  public create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.queryRoute, course).pipe(catchError(this.handleError));
  }

  public update(course: Course): Observable<Course>{
    const updateQueryRoute = this.queryRoute.concat('/', course.id.toString());
    return this.http.put<Course>( updateQueryRoute, course).pipe(catchError(this.handleError));
  }

  public delete(courseId: number): Observable<void>{
    const deleteQueryRoute = this.queryRoute.concat('/', courseId.toString());
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
