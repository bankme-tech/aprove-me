import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PayablesModule } from './payables/payables.module';
import { AssignorsModule } from './assignors/assignors.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PayablesModule, AssignorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
