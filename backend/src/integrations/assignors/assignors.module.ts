import { Module } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [AssignorsController],
  providers: [
    AssignorsService,
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AssignorsModule {}
