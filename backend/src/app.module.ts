import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayablesModule } from './integrations/payables/payables.module';
import { AssignorsModule } from './integrations/assignors/assignors.module';
import { AuthModule } from './integrations/auth/auth.module';
import { UsersModule } from './integrations/users/users.module';

@Module({
  imports: [PayablesModule, AssignorsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
