import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap} from "rxjs";
import {map} from "rxjs/operators";
import {CoursesService} from "../../services/courses.service";
import {loadCourses, loadedCourses} from "../actions/courses.actions";

@Injectable()
export class CourseEffect{
  loadCoursesEffect = createEffect(() => this.actions$.pipe(
    ofType(loadCourses),
    exhaustMap(() => this.courseService.get().pipe(
      map(courses => loadedCourses({courses}))
    ))
  ));

  constructor(
    private actions$: Actions,
    private courseService: CoursesService
  ){}
}
