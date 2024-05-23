import { Injectable, OnModuleInit } from '@nestjs/common';
import { PayableRepository } from "./repository/repository.service";
// import { PayableRepository } from './repository.service';
import { Prisma, Payable } from '@prisma/client';
import { CreatePayableAssignorDto, CreatePayableDto } from './payable.dto';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import amqp from 'amqp-connection-manager';
import { PayableProcessor } from 'src/rabbit-mq/consumer.service';

// import {AmqpConnection} from "@nestjs/microservices"

@Injectable()
export class PayableService {
  private connection: AmqpConnectionManager;
  private channelManager: ChannelWrapper;

  constructor(private readonly payableRepository: PayableRepository) { }

  async create(data: CreatePayableAssignorDto): Promise<Payable> {
    return this.payableRepository.create(data);
  }

  async findAll(): Promise<Payable[]> {
    return this.payableRepository.findAll();
  }

  async findOne(id: string): Promise<Payable | null> {
    return this.payableRepository.findOne(id);
  }

  async update(id: string, data: Prisma.PayableUpdateInput): Promise<Payable> {
    return this.payableRepository.update(id, data);
  }

  async remove(id: string): Promise<Payable> {
    return this.payableRepository.delete(id);
  }
}
