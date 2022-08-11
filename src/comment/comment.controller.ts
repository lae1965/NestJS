import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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

  @Delete()
  remove(@Query() query: any) {
    return this.commentService.remove(+query.newsId, +query.commentId);
  }
}
