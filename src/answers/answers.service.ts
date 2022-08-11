import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { NewsCommentAnswer } from 'src/news-comment-answer.interface';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class AnswersService {
  constructor(private commentService: CommentService) {}

  private getNewsCommentAnswer(
    newsId: number,
    commentId: number,
    answerId: number,
  ): NewsCommentAnswer {
    let answer: Answer = null;

    const { news, comment } = this.commentService.getNewsAndComment(
      newsId,
      commentId,
    );

    if (!!news && !!comment) {
      answer = this.getAnswer(comment, answerId);
      if (!answer) answer = null;
    }

    return { news, comment, answer };
  }

  private getAnswer(comment: Comment, answerId: number): Answer {
    return comment.answers.find(({ id }) => id === answerId);
  }

  create(createAnswerDto: CreateAnswerDto) {
    const { news, comment } = this.commentService.getNewsAndComment(
      createAnswerDto.newsId,
      createAnswerDto.commentId,
    );

    if (!news || !comment) {
      throw new NotFoundException();
    }

    const answer: Answer = {
      id: comment.answers.length + 1,
      text: createAnswerDto.text,
      author: 'Andrey Lashkevich',
      date: new Date(),
    };

    while (this.getAnswer(comment, answer.id)) answer.id++;

    return comment.answers.push(answer);
  }

  findAll(newsId: number, commentId: number) {
    const { news, comment } = this.commentService.getNewsAndComment(
      newsId,
      commentId,
    );

    if (!news || !comment) {
      throw new NotFoundException();
    }

    return comment.answers;
  }

  findOne(newsId: number, commentId: number, answerId: number) {
    const { news, comment, answer } = this.getNewsCommentAnswer(
      newsId,
      commentId,
      answerId,
    );

    if (!news || !comment || !answer) {
      throw new NotFoundException();
    }

    return answer;
  }

  update(answerId: number, updateAnswerDto: UpdateAnswerDto) {
    const { news, comment, answer } = this.getNewsCommentAnswer(
      updateAnswerDto.newsId,
      updateAnswerDto.commentId,
      answerId,
    );

    if (!news || !comment || !answer) {
      throw new NotFoundException();
    }

    if (!!updateAnswerDto.text) answer.text = updateAnswerDto.text;

    return answer;
  }

  remove(newsId: number, commentId: number, answerId: number): boolean {
    const { news, comment } = this.commentService.getNewsAndComment(
      newsId,
      commentId,
    );

    if (!news || !comment) return false;

    const answerNumber = comment.answers.findIndex(({ id }) => id === answerId);
    if (answerNumber === -1) return false;

    comment.answers.splice(answerNumber, 1);
    return true;
  }
}
