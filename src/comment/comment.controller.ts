import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { AddFileCommentDto } from './dto/add-file-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':newsId')
  findAll(@Param('newsId') newsId: string) {
    return this.commentService.findAll(+newsId);
  }

  @Get()
  findOne(@Query() query: any) {
    return this.commentService.findOne(+query.newsId, +query.commentId);
  }

  @Patch(':commentId')
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(+commentId, updateCommentDto);
  }

  @Patch('file/:commentId')
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
  addFile(@Param('commentId') commentId: string, @UploadedFile() newFile: Express.Multer.File, @Body() addFileCommentDto: AddFileCommentDto) {
    addFileCommentDto.fileName = `files/${newFile.filename}`;
    return this.commentService.addFile(+commentId, addFileCommentDto);
  }


  @Delete()
  remove(@Query() query: any) {
    return this.commentService.remove(+query.newsId, +query.commentId);
  }
}
