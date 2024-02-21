import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller()
export class HealthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/health')
  getHealth() {
    const res = this.prismaService.$queryRaw`SELECT sqlite_version();`;
    if (res) return { status: 'OK' };
  }
}
