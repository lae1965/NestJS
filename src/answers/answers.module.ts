import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [CommentModule],
})
export class AnswersModule {}
