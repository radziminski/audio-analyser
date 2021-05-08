import { UserDto } from './../dtos/user/user-dto';
import { API_ROUTES } from './../constants/api-routes';
import RequestService from './RequestService';

export class UserService {
  async fetchMe(): Promise<UserDto> {
    const response = await RequestService.client.get(API_ROUTES.USER);

    return response.data;
  }
}

const userService = new UserService();
export default userService;
