import { Err, Ok } from './../../types/either';
import { PrismaService } from 'src/database/prisma.config';
import { ReceivableRepository } from '../receivable.repository';

export class PrismaReceivableRepository implements ReceivableRepository {
  private readonly prisma_service: PrismaService;
  constructor(prisma_service: PrismaService) {
    this.prisma_service = prisma_service;
  }
  public async create_receivable(receivable: ReceivableRepository.bodyType): ReceivableRepository.IdResponseType {
    try {
      const receivableId = await this.prisma_service.receivable.create({
        data: {
          value: receivable.value,
          emissionDate: receivable.emissionDate,
          assignorId: receivable.assignorId,
        },
        select: {
          id: true,
        },
      });

      return Ok(receivableId);
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
      const data = {
        id: receivable.id,
        value: receivable.value,
        emissionDate: receivable.emissionDate.toISOString(),
        assignorId: receivable.assignorId,
      };
      return Ok(data);
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
      const data = receivables.map((receivable) => ({
        id: receivable.id,
        value: receivable.value,
        emissionDate: receivable.emissionDate.toISOString(),
        assignorId: receivable.assignorId,
      }));
      return Ok(data);
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
      const receivableId = await this.prisma_service.receivable.update({
        where: {
          id,
        },
        data: {
          value: receivable.value,
          emissionDate: receivable.emissionDate,
          assignorId: receivable.assignorId,
        },
      });

      const data = {
        id: receivableId.id,
        value: receivableId.value,
        emissionDate: receivableId.emissionDate.toISOString(),
        assignorId: receivableId.assignorId,
      };
      return Ok(data);
    } catch (error) {
      return Err(new Error(error));
    }
  }
}
