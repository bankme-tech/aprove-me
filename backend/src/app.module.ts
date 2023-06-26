import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PayablesModule } from './payables/payables.module';
import { AssignorsModule } from './assignors/assignors.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PayablesModule,
    AssignorsModule,
    UtilsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
