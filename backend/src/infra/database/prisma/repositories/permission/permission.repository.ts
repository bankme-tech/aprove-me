import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@core/auth/ports';
import { PrismaService } from '@infra/database/prisma/services';
import { Permission } from '@prisma/client';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private prisma: PrismaService) {}

  async findBy(login: string, password: string): Promise<Permission> {
    const permission = await this.prisma.permission.findFirst({
      where: {
        login,
        password,
      },
    });

    return permission ?? null;
  }

  async register(login: string, password: string): Promise<void> {
    await this.prisma.permission.create({
      data: {
        login,
        password,
      },
    });
  }
}
