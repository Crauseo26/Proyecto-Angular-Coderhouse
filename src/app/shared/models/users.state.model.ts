import {User} from "./user.model";

export interface UsersState {
  isLoading: boolean;
  users: User[];
}
