import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/database/prisma.service'
import { Auth } from '../entities/auth.entity'
import { PrismaAuthMapper } from './mappers/auth.mapper'

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(auth: Auth): Promise<void> {
    const data = PrismaAuthMapper.toPrisma(auth)
    await this.prisma.auth.create({ data })
  }

  async findByLogin(login: string): Promise<Auth | null> {
    const auth = await this.prisma.auth.findUnique({
      where: { login },
    })
    if (!auth) return null

    return PrismaAuthMapper.toDomain(auth)
  }
}
