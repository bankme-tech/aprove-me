import { Global, Module } from '@nestjs/common';
import { EnvService } from '@/infra/env/env.service';

@Global()
@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
