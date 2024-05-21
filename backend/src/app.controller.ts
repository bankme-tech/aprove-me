import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}
  @IsPublic()
  @Get('/health')
  health() {
    const dbStatus = this.prismaService.$queryRaw`SELECT 1+1 as result`;
    return {
      api: 'ok',
      dbStatus,
    };
  }

  @Get('me')
  getMe(@CurrentUser() user: User): User {
    return user;
  }
}
