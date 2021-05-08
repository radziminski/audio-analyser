import { TokensDto } from './tokens-dto';
import { UserDto } from './../user/user-dto';

export interface UserWithTokensDto {
  user: UserDto;
  tokens: TokensDto;
}
