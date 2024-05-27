import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AssignorModule } from "./assignor/assignor.module";
import { AuthModule } from "./auth/auth.module";
import { PayableModule } from "./payable/payable.module";
import { PermissionModule } from "./permission/permission.module";
import { PrismaProvider } from "./providers/prisma.provider";

@Module({
  imports: [
    {
      module: class PrismaModule {},
      providers: [PrismaProvider],
      exports: [PrismaProvider],
      global: true,
    },
    ConfigModule.forRoot({ isGlobal: true }),
    PayableModule,
    AssignorModule,
    AuthModule,
    PermissionModule,
  ],
})
export class AppModule {}
