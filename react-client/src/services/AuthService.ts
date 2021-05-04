import { UserDto } from './../dtos/user/user-dto';
import { API_ROUTES } from './../constants/api-routes';
import RequestService from './RequestService';

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
}

const AuthServiceSingleton = new AuthService();
export default AuthServiceSingleton;
