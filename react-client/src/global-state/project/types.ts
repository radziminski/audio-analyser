import { Action, Thunk, Computed } from 'easy-peasy';
import { IUser } from 'global-state/user/types';

export type ProjectAction<Payload = void> = Action<IProjectState, Payload>;

export type ProjectThunk<Payload = void, Result = void> = Thunk<
  IProjectState,
  Payload,
  Result
>;

export type ProjectComputed<Result = void> = Computed<IProjectState, Result>;

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
  isLoadingProject: number | null | true;
  projects: IProject[] | null;
  project: ProjectComputed<(id: number) => IProject | undefined>;
  fetchedAll: boolean;

  setIsLoading: ProjectAction<boolean>;
  setIsLoadingProject: ProjectAction<number | true | null>;
  setFetchedAll: ProjectAction<boolean>;
  setProjects: ProjectAction<IProject[]>;
  clearProjects: ProjectAction;
  fetchProjects: ProjectThunk<void, IProject[]>;
  fetchProject: ProjectThunk<number, IProject>;
  createProject: ProjectThunk<
    { title: string; description: string },
    IProject[]
  >;
  deleteProject: ProjectThunk<number>;
  uploadProjectFile: ProjectThunk<{ id: number; file: File }, IProject[]>;
}
