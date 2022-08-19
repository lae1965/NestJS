import { IsString, Matches, MinLength } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  text: string;

  @Matches(/\\.(jpg|jpeg|gif|bmp|png|mp3)$/i)
  thumbnail: string;
}
