import { Answer } from 'src/answers/entities/answer.entity';

export class Comment {
  id: number;
  text: string;
  author: string;
  answers: Answer[];
  date: Date;
}
