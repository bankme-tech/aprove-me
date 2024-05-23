import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PayableController } from './payable/payable.controller';
import { AssignorController } from './assignor/assignor.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PayableModule, AssignorModule, AuthModule],
  controllers: [],
  providers: [PrismaService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PayableController, AssignorController);
  }
}
