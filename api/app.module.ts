import { Module } from "@nestjs/common";
import { PayableController } from "src/payable/payable.controller";
import { PayableModule } from "src/payable/payable.module";
import { PayableService } from "src/payable/payable.service";
import { AssignorModule } from './src/assignor/assignor.module';
import { AssignorController } from "src/assignor/assignor.controller";
import { AssignorService } from "src/assignor/assignor.service";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/user.module";
import { UsersController } from "src/users/user.controller";
import { UsersService } from "src/users/user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
  imports: [
  PayableModule,
  AssignorModule,
  AuthModule,
  UsersModule,
  PrismaModule,
  JwtModule,
  
  ],
  controllers: [PayableController, AssignorController, AuthController, UsersController],
  providers: [PayableService, AssignorService, AuthService, UsersService, PrismaService],
})
export class AppModule {}
