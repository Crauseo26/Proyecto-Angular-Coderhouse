import {createAction, props} from "@ngrx/store";
import { Enrollment} from "../../models/enrollment.model"

export const loadEnrollments = createAction(
  '[Courses-Enrollment] load enrollment list'
);

export const loadedEnrollments = createAction(
  '[Courses-Enrollment] loaded enrollment list',
  props<{ enrollments: Enrollment[] }>()
)
