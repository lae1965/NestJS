import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { News } from './news.interface';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Get('all')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
  }
  @Post()
  async createNews(@Body() news: News): Promise<number> {
    return this.newsService.create(news);
  }
  @Post('/:id')
  async editNews(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() news: News,
  ): Promise<Response> {
    return this.newsService.editNews(res, +id, news);
  }
}
