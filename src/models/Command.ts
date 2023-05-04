import {
  IsInt, IsNotEmpty, IsOptional, Length, Max, Min,
} from 'class-validator';
import Meme from '@/models/Meme';
import RegisteredUser from './RegisteredUser';

const NAME_MIN = 1;
const NAME_MAX = 25;
const COMMAND_NAME_LENGTH_ERR = 'Command name must be from $constraint1 to $constraint2 characters,';

const TEXT_MIN = 1;
const TEXT_MAX = 1024;
const COMMAND_TEXT_LENGTH_ERR = 'Command text output must be from $constraint1 to $constraint2 characters,}';

const MENTION_MIN = 0;
const COMMAND_MENTION_MIN_ERR = 'Mention number cannot be smaller than $constraint1';

const MENTION_MAX = 16;
const COMMAND_MENTION_MAX_ERR = 'Cannot exceed $constraint1 mentions';

export default class Command {
  @IsOptional()
    commandID!: number;

  @Length(
    NAME_MIN,
    NAME_MAX,
    { message: COMMAND_NAME_LENGTH_ERR },
  )
  @IsNotEmpty()
    cName!: string;

  @Length(
    TEXT_MIN,
    TEXT_MAX,
    { message: COMMAND_TEXT_LENGTH_ERR },
  )
  @IsOptional()
    cText!: string;

  @IsOptional()
    cMentionsUser!: boolean;

  @IsInt()
  @IsOptional()
  @Min(MENTION_MIN, { message: COMMAND_MENTION_MIN_ERR })
  @Max(MENTION_MAX, { message: COMMAND_MENTION_MAX_ERR })
    cNumMentions!: number;

  cCreator!: RegisteredUser;

  @IsNotEmpty()
    meme!: Meme;
}
