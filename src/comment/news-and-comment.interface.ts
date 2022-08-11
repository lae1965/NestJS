import { News } from 'src/news/entities/news.entity';
import { Comment } from './entities/comment.entity';

export interface NewsAndComment {
  news: News | null;
  comment: Comment | null;
}
