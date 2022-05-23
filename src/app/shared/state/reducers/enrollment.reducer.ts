import {createReducer, on} from "@ngrx/store";
import {EnrollmentState} from "../../models/enrollment.state.model";
import {loadedEnrollments, loadEnrollments} from "../actions/enrollment.actions";

export const initialEnrollmentState: EnrollmentState = {
  isLoading: false,
  enrollments: []
}

export const enrollmentReducer = createReducer(
initialEnrollmentState,
on(loadEnrollments, (state)=>{
  return {...state, isLoading: true, enrollments: initialEnrollmentState.enrollments}
}),

on(loadedEnrollments, (state, {enrollments})=> {
  return {...state, isLoading: false, enrollments}
})
);
