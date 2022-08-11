import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
  imports: [],
})
export class NewsModule {}
