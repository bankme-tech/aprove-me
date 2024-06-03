import { Module } from '@nestjs/common';
import { PayableModule } from './integrations/payable/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './integrations/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    AssignorModule,
    PayableModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d', algorithm: 'HS256' },
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
