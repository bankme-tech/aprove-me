import { Module } from '@nestjs/common';
import { AssignorController } from './assignor.controller';
import { AssignorRepository } from './assignor.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [AssignorController],
  providers: [AssignorRepository],
})
export class AssignorModule {}
