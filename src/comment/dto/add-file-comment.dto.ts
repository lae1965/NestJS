import { IsNumber, IsNumberString, Min } from 'class-validator';

export class AddFileCommentDto {
  @IsNumberString()
  //@Min(1)
  newsId: number;

  fileName: string;
}
