import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BAD_REQUEST, GATEWAY_ERROR, MOCK_API_BASE_ROUTE} from "../constants/API.services";
import {Observable, throwError} from "rxjs";
import {Course} from "../models/courses.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesEndpoint: string;
  private queryRoute: string;

  constructor(private http: HttpClient) {
    this.coursesEndpoint = 'Course'
    this.queryRoute = `${MOCK_API_BASE_ROUTE}+${this.coursesEndpoint}`;
  }

  public get(): Observable<Course[]> {
      return this.http.get<Course[]>(this.queryRoute);
  }

  public getCorusePhoto(): Observable<any>{
    return this.http.get<any>('https://api.unsplash.com/search/photos?page=1&per_page=25&query=tecnology&client_id=LsRXhs_TYyEvPvxrpu4uqokmhXY6hwxDIdk5ME2EvZc')
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
