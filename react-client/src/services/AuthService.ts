import RequestService from './RequestService';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class AuthService {
  login(credentials: ILoginCredentials) {
    console.log('login will be here');
  }
}

const AuthServiceSingleton = new AuthService();
export default AuthServiceSingleton;
