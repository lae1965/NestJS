import { HttpStatus, Injectable } from '@nestjs/common';
import { News } from './news.interface';
import { Response } from 'express';

@Injectable()
export class NewsService {
  private readonly news: News[] = [];

  create(news: News): number {
    if (!news.createdAt) news.createdAt = new Date();
    if (!news.author) news.author = 'Andrey Lashkevich';
    news.id = this.news.length + 1; //Временно!!!!!!!!!!!
    return this.news.push(news);
  }

  findAll(): News[] {
    return this.news;
  }

  findByIndex(index: number): News | null {
    console.assert(
      typeof this.news[index] !== 'undefined',
      '[findByIndex] invalid',
    );
    if (typeof this.news[index] === 'undefined') return null;
    return this.news[index];
  }

  editNews(res: Response, id: number, news: News): Response {
    const find = this.news.find((el) => el.id === id);
    if (!find) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .end(`Запись с id = ${id} не найдена`);
    }
    for (const key in find) {
      if (!!news[key]) find[key] = news[key];
    }
    return res
      .status(HttpStatus.OK)
      .end(`Запись с id = ${id} успешно изменена`);
  }
}
