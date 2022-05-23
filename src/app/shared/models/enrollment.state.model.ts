import {Enrollment} from "./enrollment.model";

export interface EnrollmentState {
  isLoading: boolean,
  enrollments: Enrollment[]
}
