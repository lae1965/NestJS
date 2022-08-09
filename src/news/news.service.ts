import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  private news: News[] = [];

  private getOneNewsById(id: number): News {
    return this.news.find((oneNews) => oneNews.id === id);
  }

  create(createNewsDto: CreateNewsDto): number {
    const newNews: News = {
      ...createNewsDto,
      id: this.news.length + 1,
      author: 'Andrey Lashkevich',
      date: new Date(),
    };

    while (this.getOneNewsById(newNews.id)) newNews.id++;
    return this.news.push(newNews);
  }

  findAll(): News[] {
    return this.news;
  }

  findOne(id: number): News | NotFoundException {
    const findOneNews = this.getOneNewsById(id);
    if (!findOneNews) {
      throw new NotFoundException();
    }
    return findOneNews;
  }

  update(id: number, updateNewsDto: UpdateNewsDto): News | NotFoundException {
    const findOneNews = this.getOneNewsById(id);
    if (!findOneNews) {
      throw new NotFoundException();
    }

    for (const key in updateNewsDto) {
      if (!!updateNewsDto[key]) findOneNews[key] = updateNewsDto[key];
    }
    return findOneNews;
  }

  remove(id: number): boolean {
    const findNewsNumber = this.news.findIndex((oneNews) => oneNews.id === id);
    if (findNewsNumber === -1) return false;

    this.news.splice(findNewsNumber, 1);
    return true;
  }
}
