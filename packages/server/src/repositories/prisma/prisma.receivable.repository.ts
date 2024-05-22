import { Err, Ok } from 'src/types/either';
import { PrismaService } from 'src/database/prisma.config';
import { ReceivableRepository } from 'src/repositories/receivable.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaReceivableRepository implements ReceivableRepository {
  private readonly prisma_service: PrismaService;
  constructor(prisma_service: PrismaService) {
    this.prisma_service = prisma_service;
  }
  public async create_receivable(receivable: ReceivableRepository.bodyType): ReceivableRepository.responseType {
    try {
      const _receivable = await this.prisma_service.receivable.create({
        data: {
          value: receivable.value,
          emissionDate: receivable.emissionDate,
          assignorId: receivable.assignorId,
        },
      });
      return Ok(_receivable);
    } catch (error) {
      return Err(new Error(error));
    }
  }

  public async get_receivable(id: string): ReceivableRepository.responseType {
    try {
      const receivable = await this.prisma_service.receivable.findUnique({
        where: {
          id,
        },
      });
      return Ok(receivable);
    } catch (error) {
      return Err(new Error(error));
    }
  }
  public async get_list_receivable(): ReceivableRepository.listResponseType {
    try {
      const receivables = await this.prisma_service.receivable.findMany({
        select: {
          id: true,
          value: true,
          emissionDate: true,
          assignorId: true,
        },
      });
      return Ok(receivables);
    } catch (error) {
      return Err(new Error(error));
    }
  }

  public async get_receivable_by_assignor(assignorId: string): ReceivableRepository.listResponseType {
    try {
      const receivables = await this.prisma_service.receivable.findMany({
        where: {
          assignorId,
        },
        select: {
          id: true,
          value: true,
          emissionDate: true,
          assignorId: true,
        },
      });
      return Ok(receivables);
    } catch (error) {
      return Err(new Error(error));
    }
  }

  public async delete_receivable(id: string): Promise<void> {
    await this.prisma_service.receivable.delete({
      where: {
        id,
      },
    });
    return;
  }

  public async update_receivable(
    id: string,
    receivable: ReceivableRepository.bodyType,
  ): ReceivableRepository.responseType {
    try {
      const data = await this.prisma_service.receivable.update({
        where: {
          id,
        },
        data: {
          value: receivable.value,
          emissionDate: receivable.emissionDate,
          assignorId: receivable.assignorId,
        },
      });

      return Ok(data);
    } catch (error) {
      return Err(new Error(error));
    }
  }
}
