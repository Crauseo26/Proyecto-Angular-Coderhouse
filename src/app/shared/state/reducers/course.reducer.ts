import {createReducer, on} from "@ngrx/store";
import {CourseState} from "../../models/course.state.model";
import {loadCourses, loadedCourses} from "../actions/courses.actions";

export const initialCourseState: CourseState = {
  isLoading:  false,
  courses: []
}

export const courseReducer = createReducer(
  initialCourseState,
  on(loadCourses, (state)=>{
    return { ...state, isLoading: true, courses: initialCourseState.courses}
  } ),

  on(loadedCourses, (state, {courses}) =>{
    return { ...state, isLoading: false, courses }
  })
);
