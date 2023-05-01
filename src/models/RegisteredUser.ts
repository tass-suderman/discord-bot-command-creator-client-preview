/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Registered user entity for CWEB280FinalProject
 */
import { IsOptional, Length } from 'class-validator';
import Meme from './Meme';

const USER_ID_MIN = 17;
const USER_ID_MAX = 20;
const USER_ID_LENGTH_ERR = 'User ID must be from $constraint1 to $constraint2 characters';
const USER_NAME_MIN = 2;
const USER_NAME_MAX = 32;
const USER_NAME_LENGTH_ERR = 'Username must be from $constraint1 to $constraint2 characters';

export default class RegisteredUser {
  @Length(
    USER_ID_MIN,
    USER_ID_MAX,
    { message: USER_ID_LENGTH_ERR },
  )
  @IsOptional()
    uID!: string;

  @Length(
    USER_NAME_MIN,
    USER_NAME_MAX,
    { message: USER_NAME_LENGTH_ERR },
  )
  @IsOptional()
    userName!: string;

  memes!: Meme[];
}
