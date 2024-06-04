import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReceivableModule } from 'src/app/receivable/receivable.module';
import { AssignorsModule } from '../../app/assignor/assignor.module';
import appConfig from '../config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const InternModules = [
  AssignorsModule,
  ReceivableModule
]

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig],
          envFilePath: [`.env.${process.env.NODE_ENV}`]
      }),
      ...InternModules,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}