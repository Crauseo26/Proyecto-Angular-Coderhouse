import { ActionReducerMap } from "@ngrx/store";
import {sessionReducer} from "./reducers/session.reducer";
import {SessionState} from "../models/session-state.model";
import {StudentState} from "../models/student.state.model";
import {studentReducer} from "./reducers/student.reducer";
import {CourseState} from "../models/course.state.model";
import {courseReducer} from "./reducers/course.reducer";
import {EnrollmentState} from "../models/enrollment.state.model";
import {enrollmentReducer} from "./reducers/enrollment.reducer";
import {UsersState} from "../models/users.state.model";
import {userReducer} from "./reducers/user.reducer";

export interface AppState {
  session: SessionState,
  students: StudentState,
  courses: CourseState,
  enrollments: EnrollmentState,
  users: UsersState
};

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  session: sessionReducer,
  students: studentReducer,
  courses: courseReducer,
  enrollments: enrollmentReducer,
  users: userReducer
}
