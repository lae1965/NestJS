import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AdminOnly } from 'src/decorators/admin-only.decorator';
import { AccessGuard } from 'src/guards/access/access.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { extname } from 'path';

const role = 'admin';
// const role = 'not_admin';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  @AdminOnly(role)
  @UseGuards(AccessGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/thumbnails',
        filename: (req, file, cb) => {
          cb(null, `${v4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /p?jpeg|gif|png|svg|tiff|webp/ })],
      })
    )
    file: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto,
  ) {
    createNewsDto.thumbnail = `thumbnails/${file.filename}`;
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Patch('file/:id')
  @UseInterceptors(
    FileInterceptor('newFile', {
      storage: diskStorage({
        destination: './public/files',
        filename: (req, newFile, cb) => {
          cb(null, `${v4()}${extname(newFile.originalname)}`);
        },
      }),
    }),
  )
  addFile(@Param('id') id: string, @UploadedFile() newFile: Express.Multer.File) {
    return this.newsService.addFile(+id, `files/${newFile.filename}`);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
