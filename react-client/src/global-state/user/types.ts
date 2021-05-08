import { Action, Thunk } from 'easy-peasy';
export enum UserRole {
  User = 'user',
  Editor = 'editor',
  Admin = 'admin'
}

export type UserAction<Payload = void> = Action<UserState, Payload>;

export type UserThunk<Payload = void, Result = void> = Thunk<
  UserState,
  Payload,
  Result
>;

export interface User {
  id: number;
  profileId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

export interface UserState {
  isLoading: boolean;
  user: User | null;

  setIsLoading: UserAction<boolean>;
  setUser: UserAction<User>;
  clear: UserAction;
  fetchUser: UserThunk<void, User>;
}
