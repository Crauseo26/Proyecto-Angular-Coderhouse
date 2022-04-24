import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "../../features/students/student-table/student-table-datasource";
import {HttpClient} from "@angular/common/http";
import {BAD_REQUEST, GATEWAY_ERROR, MOCK_API_ROUTE} from "../constants/API.services";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentEndpoint = 'Student';
  private queryRoute: string;

  constructor(private http: HttpClient) {
    this.queryRoute = `${MOCK_API_ROUTE}/${this.studentEndpoint}`;
  }

  public get(): Observable<Student[]> {
    return this.http.get<Student[]>(this.queryRoute);
  }

  public create(student: Student): Observable<void> {
    return this.http.post<void>(this.queryRoute, student);
  }

  public update(student: Student): Observable<void>{
    const updateQueryRoute = this.queryRoute.concat('/', student.id.toString());
    return this.http.put<void>( updateQueryRoute, student);
  }

  public async handleError(error: Response | any) {
    if ((error as Response).status === GATEWAY_ERROR) {
      return Promise.reject({ exceptionMessage: 'Can not connect to server' });
    } else if ((error as Response).status === BAD_REQUEST) {
      return Promise.reject({ exceptionMessage: 'Error with sent data' });
    }
    return Promise.reject(error);
  }
}
