import {StudentState} from "../../models/student.state.model";
import {createReducer, on} from "@ngrx/store";
import {
  createStudent, deleteStudent,
  editStudent,
  loadedStudents,
  loadStudents,
  studentCreated, studentDeleted,
  studentEdited
} from "../actions/students.actions";

export const initialStudentState: StudentState = {
  isLoading:  false,
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  students: []
}

export const studentReducer = createReducer(
  initialStudentState,
  on(loadStudents, (state)=>{
    return { ...state, isLoading: true, students: initialStudentState.students}
  } ),

  on(loadedStudents, (state, {students}) =>{
    return { ...state, isLoading: false, students }
  }),

  on(createStudent, (state) =>{
    return {...state, isCreating: true}
  }),

  on(studentCreated, (state) =>{
    return {...state, isCreating: false}
  }),

  on(editStudent, (state)=>{
    return {...state, isEditing: true}
  }),

  on(studentEdited, (state)=>{
    return {...state, isEditing: false}
  }),

  on(deleteStudent, (state)=>{
    return {...state, isDeleting: true}
  }),

  on(studentDeleted, (state)=>{
    return {...state, isDeleting: false}
  }),
)
