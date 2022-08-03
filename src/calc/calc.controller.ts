import { Controller, Put, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CalcService } from './calc.service';

@Controller('calc')
export class CalcController {
  constructor(private calcService: CalcService) {}
  @Put()
  async calculator(@Req() req: Request, @Query() query) {
    const { a, b } = query;
    switch (req.headers['type-operation']) {
      case 'plus':
        return this.calcService.plus(+a, +b);
      case 'minus':
        return this.calcService.minus(+a, +b);
      case 'mult':
        return this.calcService.mult(+a, +b);
      case 'div':
        return this.calcService.div(+a, +b);
      default:
        return 'Invalid request';
    }
  }
}
