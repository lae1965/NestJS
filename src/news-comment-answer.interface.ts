import { Answer } from './answers/entities/answer.entity';
import { NewsAndComment } from './comment/news-and-comment.interface';

export interface NewsCommentAnswer extends NewsAndComment {
  answer: Answer | null;
}
