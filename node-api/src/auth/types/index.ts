export interface LoginCredentials {
  email: string;
  password: string;
}

export type RequestWithUser = Request & {
  user: {
    email: string;
  };
};
