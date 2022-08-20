import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from 'src/news/entities/news.entity';
import { NewsService } from 'src/news/news.service';
import { AddFileCommentDto } from './dto/add-file-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { NewsAndComment } from './news-and-comment.interface';

@Injectable()
export class CommentService {
  constructor(private newsService: NewsService) { }

  getNewsAndComment(newsId: number, commentId: number): NewsAndComment {
    let news: News = this.newsService.getOneNewsById(newsId);
    let comment: Comment = null;

    if (!!news) {
      comment = this.getOneCommentById(news, commentId);
      if (!comment) comment = null;
    } else news = null;
    return { news, comment };
  }

  private getOneCommentById(news: News, commentId: number): Comment {
    return news.comments.find(({ id }) => id === commentId);
  }

  create(createCommentDto: CreateCommentDto) {
    console.log(createCommentDto.newsId);
    const news: News = this.newsService.getOneNewsById(+createCommentDto.newsId);
    if (!news) {
      throw new NotFoundException();
    }

    const newComment: Comment = {
      id: news.comments.length + 1,
      text: createCommentDto.text,
      author: 'Andrey Lashkevich',
      answers: [],
      attachments: [],
      date: new Date(),
    };
    while (!!this.getOneCommentById(news, newComment.id)) newComment.id++;

    return news.comments.push(newComment);
  }

  findAll(id: number) {
    const news: News = this.newsService.getOneNewsById(id);
    if (!news) {
      throw new NotFoundException();
    }
    return news.comments;
  }

  findOne(newsId: number, commentId: number) {
    const { news, comment } = this.getNewsAndComment(newsId, commentId);

    if (!news || !comment) {
      throw new NotFoundException();
    }

    return comment;
  }

  update(commentId: number, updateCommentDto: UpdateCommentDto) {
    const { news, comment } = this.getNewsAndComment(
      +updateCommentDto.newsId,
      commentId,
    );

    if (!news || !comment) {
      throw new NotFoundException();
    }

    if (!!updateCommentDto.text) comment.text = updateCommentDto.text;
    return comment;
  }

  addFile(commentId: number, addFileCommentDto: AddFileCommentDto) {
    const { news, comment } = this.getNewsAndComment(+addFileCommentDto.newsId, commentId);

    if (!news || !comment) {
      throw new NotFoundException();
    }

    comment.attachments.push(addFileCommentDto.fileName);
    return comment;
  }

  remove(newsId: number, commentId: number) {
    const news: News = this.newsService.getOneNewsById(newsId);
    if (!news) {
      return false;
    }

    const commentNumber = news.comments.findIndex(({ id }) => id === commentId);
    if (commentNumber === -1) {
      return false;
    }
    news.comments.splice(commentNumber, 1);
    return true;
  }
}
