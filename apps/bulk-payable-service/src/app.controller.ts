import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';

import { PrismaService } from '@infra/prisma/services/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly _prismaService: PrismaService) {}

  @EventPattern('payable.create.bulk')
  async getHello(@Payload() dto: ICreatePayable): Promise<void> {
    const assignor = await this._prismaService.assignor.create({
      data: {
        document: dto.assignor.document,
        name: dto.assignor.name,
        email: dto.assignor.email,
        phone: dto.assignor.phone,
      },
    });
    await this._prismaService.payable.create({
      include: { assignor: true },
      data: {
        value: dto.value,
        emissionDate: new Date(dto.emissionDate),
        assignorId: assignor.id,
      },
    });
  }
}
