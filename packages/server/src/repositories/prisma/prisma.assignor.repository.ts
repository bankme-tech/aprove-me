import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.config';
import { assignorUniqueResponseType } from 'src/dtos/assignor.dto';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { Err, Ok, Result } from 'src/types/either';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  private readonly prisma_service: PrismaService;
  constructor(prisma_service: PrismaService) {
    this.prisma_service = prisma_service;
  }

  async create_assignor(assignor: AssignorRepository.bodyType): AssignorRepository.responseType {
    try {
      const data = await this.prisma_service.assignor.create({
        data: {
          document: assignor.document,
          email: assignor.email,
          phone: assignor.phone,
          name: assignor.name,
        },
      });
      return Ok(data);
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
  async get_assignor_by_document(document: string): AssignorRepository.responseType {
    try {
      const assignor = await this.prisma_service.assignor.findUnique({
        where: {
          document,
        },
      });
      return Ok(assignor);
    } catch (error) {
      return Err(new Error(error));
    }
  }
  async get_assignor_by_email(email: string): AssignorRepository.responseType {
    try {
      const assignor = await this.prisma_service.assignor.findUnique({
        where: {
          email,
        },
      });
      return Ok(assignor);
    } catch (error) {
      return Err(new Error(error));
    }
  }
  async get_assignor_by_phone(phone: string): AssignorRepository.responseType {
    try {
      const assignor = await this.prisma_service.assignor.findUnique({
        where: {
          phone,
        },
      });
      return Ok(assignor);
    } catch (error) {
      return Err(new Error(error));
    }
  }

  async get_unique_assignor(
    assignor: Partial<AssignorRepository.bodyType>,
  ): Promise<Result<Error, assignorUniqueResponseType>> {
    try {
      if (assignor.document) {
        const assignorId = await this.prisma_service.assignor.findUnique({
          where: {
            document: assignor.document,
          },
          select: {
            id: true,
          },
        });
        if (assignorId) {
          return Ok({
            id: assignorId.id,
            field: 'document',
          });
        }
      }
      if (assignor.email) {
        const assignorId = await this.prisma_service.assignor.findUnique({
          where: {
            email: assignor.email,
          },
          select: {
            id: true,
          },
        });

        if (assignorId) {
          return Ok({
            id: assignorId.id,
            field: 'email',
          });
        }
      }
      if (assignor.phone) {
        const assignorId = await this.prisma_service.assignor.findUnique({
          where: {
            phone: assignor.phone,
          },
          select: {
            id: true,
          },
        });
        if (assignorId) {
          return Ok({
            id: assignorId.id,
            field: 'phone',
          });
        }
      }
      return Ok({
        id: null,
        field: null,
      });
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
