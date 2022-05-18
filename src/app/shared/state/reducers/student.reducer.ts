import {StudentState} from "../../models/student.state.model";
import {createReducer, on} from "@ngrx/store";
import {loadedStudents, loadStudents} from "../actions/students.actions";

export const initialStudentState: StudentState = {
  isLoading:  false,
  students: []
}

export const studentReducer = createReducer(
  initialStudentState,
  on(loadStudents, (state)=>{
    return { ...state, isLoading: true, students: initialStudentState.students}
  } ),

  on(loadedStudents, (state, {students}) =>{
    return { ...state, isLoading: false, students }
  })
)
