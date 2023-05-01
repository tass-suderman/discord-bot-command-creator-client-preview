/**
 * @author Tass Suderman, Levi Krozser
 * @purpose Tag entity for CWEB280FinalProject
 */
import { IsAlphanumeric, Length } from 'class-validator';
import Meme from './Meme';

const TAG_NAME_MIN = 1;
const TAG_NAME_MAX = 12;
const TAG_NAME_ERR = 'Tag name must be from $constraint1 to $constraint2 characters';

export default class Tag {
  @IsAlphanumeric()
  @Length(TAG_NAME_MIN, TAG_NAME_MAX, { message: TAG_NAME_ERR })
    tagName!: string;

  memes!: Meme[];
}
