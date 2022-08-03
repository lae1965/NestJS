import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcService {
  plus(a: number, b: number): string {
    return `${a} + ${b} = ${a + b}`;
  }
  minus(a: number, b: number): string {
    return `${a} - ${b} = ${a - b}`;
  }
  mult(a: number, b: number): string {
    return `${a} * ${b} = ${a * b}`;
  }
  div(a: number, b: number): string {
    if (b === 0) return 'Ошибка: деление на 0!!!';
    return `${a} / ${b} = ${a / b}`;
  }
}
