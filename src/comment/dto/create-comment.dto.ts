import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @Min(1)
  newsId: number;

  @IsString()
  @MinLength(2)
  text: string;
}
