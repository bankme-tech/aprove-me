import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "src/domain/operations/application/repositories/account-repository";
import { Account } from "src/domain/operations/enterprise/entities/accounts";
import { PrismaService } from "../prisma.service";
import { PrismaAccountMapper } from "../mappers/prisma-account-mapper";

@Injectable()
export class PrismaAccountsRepository extends AccountsRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(data: Account) {
    const dataToPrisma = PrismaAccountMapper.toPrisma(data)
    
    dataToPrisma.id = data.id.toString()

    await this.prisma.user.create({
      data: dataToPrisma
    })
  }

  async findById(id: string): Promise<Account | null> {
    const account = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    
    if (!account) {
      return null
    }

    return PrismaAccountMapper.toDomain(account)
  }

  async findByLogin(login: string): Promise<Account | null> {
    const account = await this.prisma.user.findUnique({
      where: {
        login
      }
    })
    
    if (!account) {
      return null
    }

    return PrismaAccountMapper.toDomain(account)
  }
 
}