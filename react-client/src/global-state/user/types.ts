import { Action, Thunk } from 'easy-peasy';
export enum UserRole {
  User = 'user',
  Editor = 'editor',
  Admin = 'admin'
}

export type UserAction<Payload = void> = Action<IUserState, Payload>;

export type UserThunk<Payload = void, Result = void> = Thunk<
  IUserState,
  Payload,
  Result
>;

export interface IUser {
  id: number;
  profileId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

export interface IUserState {
  isLoading: boolean;
  user: IUser | null;

  setIsLoading: UserAction<boolean>;
  setUser: UserAction<IUser>;
  clear: UserAction;
  fetchUser: UserThunk<void, IUser>;
}
