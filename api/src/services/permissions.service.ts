import { Injectable } from '@nestjs/common';
import { Permission, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.PermissionCreateInput): Promise<Permission> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const permission = await this.prisma.permission.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });

    delete permission.password;

    return permission;
  }

  async validateUser(data: Prisma.PermissionCreateInput): Promise<boolean> {
    const user = await this.prisma.permission.findUnique({
      where: {
        login: data.login
      }
    });

    if (user && await bcrypt.compare(data.password, user.password)) {
      return true;
    } else {
      return false;
    }
  }

  async findUnique(where: Prisma.PermissionWhereUniqueInput): Promise<Permission | null> {
    return this.prisma.permission.findUnique({ where });
  }
}