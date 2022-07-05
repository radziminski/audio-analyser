import { UserDto } from './../user/user-dto';
import { TokensDto } from './tokens-dto';

export interface UserWithTokensDto {
  user: UserDto;
  tokens: TokensDto;
}
