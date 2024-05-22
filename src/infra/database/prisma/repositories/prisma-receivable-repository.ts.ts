import { Injectable } from "@nestjs/common";
import { ReceivableRepository } from "src/domain/operations/application/repositories/receivable-repository";
import { Receivable } from "src/domain/operations/enterprise/entities/receivable";
import { PrismaReceivableMapper } from "../mappers/prisma-receivable-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaReceivableRepository extends ReceivableRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(data: Receivable) {
    const dataToPrisma = PrismaReceivableMapper.toPrisma(data) 

    await Promise.resolve(() => {
      this.prisma.receivable.update({
        where: {
          id: data.id.toString()
        },
        data: dataToPrisma
      })
    })

    return data
  }

  async create(data: Receivable) {
    const dataToPrisma = PrismaReceivableMapper.toPrisma(data)
    
    dataToPrisma.assignorId = data.assignor

    await this.prisma.receivable.create({
      data: dataToPrisma
    })
  }

  async delete(recivableId: string) {
    await this.prisma.receivable.delete({
      where: {
        id: recivableId
      }
    })
  }

  async findById(id: string): Promise<Receivable | null> {
    const receivable = await this.prisma.receivable.findUnique({
      where: {
        id
      }
    })
    
    if (!receivable) {
      return null
    }

    return PrismaReceivableMapper.toDomain(receivable)
  }


  async findByAssignorId(assignorId: string): Promise<Receivable[] | null> {
    const receivable = await this.prisma.receivable.findMany({
      where: {
        assignorId
      }
    })

    if (!receivable) {
      return null
    }

    let toDomainList = []

    receivable.forEach((item) => {
      toDomainList.push(PrismaReceivableMapper.toDomain(item))
    })

    return toDomainList
  }
  
}