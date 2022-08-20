import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  title: string;

  @IsString()
  @MinLength(10)
  text: string;

  thumbnail: string;
}
