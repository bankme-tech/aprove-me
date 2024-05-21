import { Module } from '@nestjs/common';
import { AssignorModule } from './modules/assignor/assignor.module';

@Module({
  imports: [AssignorModule],
  providers: [],
})
export class AppModule {}
