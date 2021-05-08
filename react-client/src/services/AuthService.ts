import { UserDto } from './../dtos/user/user-dto';
import { API_ROUTES } from './../constants/api-routes';
import RequestService from './RequestService';

const ACCESS_TOKEN_STORAGE_KEY = 'token';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ITokens {
  accessToken: string | null;
}

export class AuthService {
  async login(credentials: ILoginCredentials): Promise<string> {
    const response = await RequestService.client.post(
      API_ROUTES.LOGIN,
      credentials
    );

    return response.data['access_token'];
  }

  async register(credentials: IRegisterCredentials): Promise<UserDto> {
    const response = await RequestService.client.post(
      API_ROUTES.REGISTER,
      credentials
    );

    return response.data;
  }

  setTokens(tokens: ITokens) {
    if (tokens.accessToken)
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokens.accessToken);
  }

  getTokens(): ITokens {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

    return { accessToken };
  }

  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  async logout() {
    // TODO
  }
}

const AuthServiceSingleton = new AuthService();
export default AuthServiceSingleton;
