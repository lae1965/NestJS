import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { NewsModule } from 'src/news/news.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [NewsModule],
  exports: [CommentService],
})
export class CommentModule {}
