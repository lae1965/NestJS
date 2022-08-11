import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { CommentModule } from './comment/comment.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [NewsModule, CommentModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
