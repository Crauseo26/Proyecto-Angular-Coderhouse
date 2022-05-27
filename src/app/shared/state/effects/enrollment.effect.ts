import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap} from "rxjs";
import {map} from "rxjs/operators";
import {loadedEnrollments, loadEnrollments} from "../actions/enrollment.actions";
import {EnrollmentService} from "../../services/enrollment.service";

@Injectable()
export class EnrollmentEffect{
  loadEnrollmentEffect = createEffect(() => this.actions$.pipe(
    ofType(loadEnrollments),
    exhaustMap(() => this.enrollmentService.get().pipe(
      map(enrollments => loadedEnrollments({enrollments}))
    ))
  ));

  constructor(
    private actions$: Actions,
    private enrollmentService: EnrollmentService
  ){}
}
