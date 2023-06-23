import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { PayableController } from './payable/controllers/payable.controller';
import { UserController } from './user/controllers/user.controller';
import { AssignorController } from './assignor/controllers/assignor.controller';
import { PayableService } from './payable/service/payable.service';
import { AssignorService } from './assignor/service/assignor.service';
import { UserService } from './user/service/user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [
    AuthController,
    PayableController,
    AssignorController,
    UserController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PayableService,
    AssignorService,
    PrismaService,
    UserService,
  ],
})
export class AppModule {}
