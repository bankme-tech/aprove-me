import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AssignorsRepository } from "src/domain/operations/application/repositories/assignor-repository";
import { Assignor } from "src/domain/operations/enterprise/entities/assignor";
import { PrismaAssignorMapper } from "../mappers/prisma-assignor-mapper";

@Injectable()
export class PrismaAssignorsRepository implements AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async save(data: Assignor) {
    const dataToPrisma = PrismaAssignorMapper.toPrisma(data) 

    await Promise.resolve(() => {
      this.prisma.assignor.update({
        where: {
          id: data.id.toString()
        },
        data: dataToPrisma
      })
    })

    return data
  }

  async create(data: Assignor) {
    const dataToPrisma = PrismaAssignorMapper.toPrisma(data) 
    await this.prisma.assignor.create({
      data: dataToPrisma,
    })
  }

  async delete(assignorId: string) {
    await this.prisma.assignor.delete({
      where: {
        id: assignorId
      }
    })
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