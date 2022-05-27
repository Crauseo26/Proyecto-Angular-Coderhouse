import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MOCK_API_BASE_ROUTE} from "../constants/API.services";
import {catchError, delay, Observable, throwError} from "rxjs";
import {Student} from "../models/student.model";
import {User} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UsersService {
  private usersEndpoint = 'User';
  private queryRoute: string;

  constructor(private http: HttpClient) {
    this.queryRoute = `${MOCK_API_BASE_ROUTE}/${this.usersEndpoint}`;
  }

  public get(): Observable<User[]> {
    return this.http.get<User[]>(this.queryRoute).pipe(catchError(this.handleError), delay(1500));
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(this.queryRoute, user).pipe(catchError(this.handleError));
  }

  public update(user: User): Observable<User>{
    const updateQueryRoute = this.queryRoute.concat('/', user.id.toString());
    return this.http.put<User>( updateQueryRoute, user).pipe(catchError(this.handleError));
  }

  public delete(userId: number): Observable<void>{
    const deleteQueryRoute = this.queryRoute.concat('/', userId.toString());
    return this.http.delete<void>(deleteQueryRoute).pipe(catchError(this.handleError), delay(2000));
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
