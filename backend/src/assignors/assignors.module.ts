import { Module } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AssignorsController],
  providers: [AssignorsService],
})
export class AssignorsModule {}
