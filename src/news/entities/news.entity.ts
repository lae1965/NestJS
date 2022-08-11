import { Comment } from "src/comment/entities/comment.entity";

export class News {
  id: number;
  title: string;
  text: string;
  author: string;
  comments: Comment[];
  date: Date;
}
