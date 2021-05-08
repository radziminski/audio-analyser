import { Action, Thunk } from 'easy-peasy';
import { IUser } from 'global-state/user/types';

export type ProjectAction<Payload = void> = Action<IProjectState, Payload>;

export type ProjectThunk<Payload = void, Result = void> = Thunk<
  IProjectState,
  Payload,
  Result
>;

export interface IProject {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  editedAt?: string;
  files: IFile[];
  users: IUser[];
}

export interface IFile {
  id: number;
  url: string;
  key: string;
  acl: string;
  name: string;
  originalName: string | null;
  createdAt: string | null;
  length: number | null;
  size: number;
  mimeType: string;
}

export interface IProjectState {
  isLoading: boolean;
  projects: IProject[] | null;

  setIsLoading: ProjectAction<boolean>;
  setProjects: ProjectAction<IProject[]>;
  clearProjects: ProjectAction;
  fetchProjects: ProjectThunk<void, IProject[]>;
  createProject: ProjectThunk<
    { title: string; description: string },
    IProject[]
  >;
}
