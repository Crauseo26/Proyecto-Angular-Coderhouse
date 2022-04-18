import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "../../components/content/student-table/student-table-datasource";
import {HttpClient} from "@angular/common/http";
import {BAD_REQUEST, GATEWAY_ERROR, MOCK_API_ROUTE} from "../constants/API.services";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentEndpoint = 'Student';
  private queryRoute: string;
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
    phone: "",
    profilePhoto: ""
  };

  constructor(private http: HttpClient) {

    this.queryRoute = `${MOCK_API_ROUTE}/${this.studentEndpoint}`;

  }

  public get(): Observable<any> {
    return this.http.get(this.queryRoute);
  }

  public async create(student: Student): Promise<Student| undefined> {
    try{
      return await this.http.post<Student>(this.queryRoute, student).toPromise();
    }catch(error){
      return await this.handleError(error);
    }
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
