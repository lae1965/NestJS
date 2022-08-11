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
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get('all')
  findAll(@Query() { newsId, commentId }) {
    return this.answersService.findAll(+newsId, +commentId);
  }

  @Get()
  findOne(@Query() { newsId, commentId, answerId }) {
    return this.answersService.findOne(+newsId, +commentId, +answerId);
  }

  @Patch(':answerId')
  update(
    @Param('answerId') answerId: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(+answerId, updateAnswerDto);
  }

  @Delete()
  remove(@Query() { newsId, commentId, answerId }) {
    return this.answersService.remove(+newsId, +commentId, +answerId);
  }
}
