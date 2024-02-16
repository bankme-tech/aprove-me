import { Injectable } from '@nestjs/common';
import { CreateReceivableDTO } from './createReceivableDTO';

@Injectable()
export class ReceivableService {
  getAllPayable(): string {
    return 'This should return the response body for POST method of the same name';
  }

  async create(createReceivableDTO: CreateReceivableDTO) {
    const createdReceivable = {};

    return createdReceivable;
  }
}
