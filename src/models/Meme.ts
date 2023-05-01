/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Meme entity for CWEB280FinalProject
 */
import { IsOptional, Length, Matches } from 'class-validator';
import Tag from './Tag';
import RegisteredUser from './RegisteredUser';

const DESC_MIN = 1;
const DESC_MAX = 64;
const DESC_LENGTH_ERROR = 'Meme description must be from $constraint1 to $constraint2 characters';

const IMAGE_LENGTH_MIN = 8;
const IMAGE_LENGTH_MAX = 512;
const IMAGE_LENGTH_ERR = 'Image route path must be from $constraint1 to $constraint2 characters';
const IMAGE_REGEX = /(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg))/;
const IMAGE_URL_ERR = 'Meme image must be a valid image URL';

export default class Meme {
  @IsOptional()
    memeID!: number;

  @Length(
    DESC_MIN,
    DESC_MAX,
    { message: DESC_LENGTH_ERROR },
  )
    mDescription!: string;

  @Length(
    IMAGE_LENGTH_MIN,
    IMAGE_LENGTH_MAX,
    { message: IMAGE_LENGTH_ERR },
  )
  @Matches(IMAGE_REGEX, {
    message: IMAGE_URL_ERR,
  })
    mImageRoute!: string;

  tags!: Tag[];

  @IsOptional()
    mCreator!: RegisteredUser;
}
