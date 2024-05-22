import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AssignorsRepository } from "src/domain/operations/application/repositories/assignor-repository";
import { Assignor } from "src/domain/operations/enterprise/entities/assignor";
import { PrismaAssignorMapper } from "../mappers/prisma-assignor-mapper";

@Injectable()
export class PrismaAssignorsRepository implements AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  save(data: Assignor): Promise<Assignor> {
    throw new Error("Method not implemented.");
  }

  create(data: Assignor): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(assignorId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id
      }
    })

    if (!assignor) {
      return null
    }

    return PrismaAssignorMapper.toDomain(assignor)
  }

}