import {UserLogin} from "./user-login.model";

export interface SessionState {
  isActive: boolean;
  currentUser: UserLogin;
}
