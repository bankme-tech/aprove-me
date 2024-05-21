import { AccountEntity } from '../../entities/account.entity';
import { IAccountRepository } from '../interfaces/account.repository-interface';
import { AccountMapper } from '../../mappers/account.mapper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/prisma.service';

@Injectable()
export class PrismaAccountRepository implements IAccountRepository {
  constructor(private prisma: PrismaService) {}

  async findByLogin(login: string): Promise<AccountEntity> {
    const entity = await this.prisma.account.findFirst({ where: { login } });

    if (!entity) return null;

    return AccountMapper.toDomain(entity);
  }
}
