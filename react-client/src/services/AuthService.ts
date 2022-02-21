import { LoginDto } from '~/dtos/auth/login-dto';
import { UserWithTokensDto } from '~/dtos/auth/user-with-tokens-dto';

import { API_ROUTES } from './../constants/api-routes';
import { RegisterDto } from './../dtos/auth/register-dto';
import RequestService from './RequestService';

const ACCESS_TOKEN_STORAGE_KEY = 'token';

export interface ITokens {
  accessToken: string | null;
}

export class AuthService {
  async login(loginDto: LoginDto): Promise<string> {
    const response = await RequestService.client.post(
      API_ROUTES.LOGIN,
      loginDto
    );

    const accessToken = response.data['access_token'];

    this.setTokens({ accessToken });

    return accessToken;
  }

  async register(registerDto: RegisterDto): Promise<UserWithTokensDto> {
    const response = await RequestService.client.post(
      API_ROUTES.REGISTER,
      registerDto
    );

    const accessToken = response.data.tokens['access_token'];
    this.setTokens({ accessToken });

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

  hasStoredTokens() {
    return !!localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  logout() {
    this.clearTokens();
  }
}

const AuthServiceSingleton = new AuthService();
export default AuthServiceSingleton;
