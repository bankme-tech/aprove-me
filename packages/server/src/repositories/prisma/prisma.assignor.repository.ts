import { PrismaService } from 'src/database/prisma.config';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { Err, Ok, Result } from 'src/types/either';

export class PrismaAssignorRepository implements AssignorRepository {
  private readonly prisma_service: PrismaService;
  constructor(prisma_service: PrismaService) {
    this.prisma_service = prisma_service;
  }

  async create_assignor(assignor: AssignorRepository.bodyType): AssignorRepository.IdResponseType {
    try {
      const assignorId = await this.prisma_service.assignor.create({
        data: {
          document: assignor.document,
          email: assignor.email,
          phone: assignor.phone,
          name: assignor.name,
        },
        select: {
          id: true,
        },
      });

      return Ok(assignorId);
    } catch (error) {
      return Err(new Error(error));
    }
  }
  async get_assignor(id: string): AssignorRepository.responseType {
    try {
      const assignor = await this.prisma_service.assignor.findUnique({
        where: {
          id,
        },
      });
      return Ok(assignor);
    } catch (error) {
      return Err(new Error(error));
    }
  }
  async get_list_assignor(): AssignorRepository.listResponseType {
    try {
      const assignors = await this.prisma_service.assignor.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          document: true,
        },
      });
      return Ok(assignors);
    } catch (error) {
      return Err(new Error(error));
    }
  }
  async delete_assignor(id: string): Promise<Result<Error, void>> {
    try {
      await this.prisma_service.assignor.delete({
        where: {
          id,
        },
      });
      return;
    } catch (error) {
      return Err(new Error(error));
    }
  }
  async update_assignor(id: string, assignor: AssignorRepository.bodyType): AssignorRepository.IdResponseType {
    try {
      const assignorId = await this.prisma_service.assignor.update({
        where: {
          id,
        },
        data: {
          document: assignor.document,
          email: assignor.email,
          phone: assignor.phone,
          name: assignor.name,
        },
      });

      return Ok(assignorId);
    } catch (error) {
      return Err(new Error(error));
    }
  }
}
