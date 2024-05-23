import { HttpException, HttpStatus } from '@nestjs/common';

export class ReceivableNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Receivable ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
