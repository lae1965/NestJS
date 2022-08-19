import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateAnswerDto {
  @IsNumber()
  @Min(1)
  newsId: number;

  @IsNumber()
  @Min(1)
  commentId: number;

  @IsString()
  @MinLength(2)
  text: string;
}
