import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { DomainModule } from './modules/domain.module';

@Module({
  imports: [InfraModule, DomainModule],
})
export class AppModule {}
