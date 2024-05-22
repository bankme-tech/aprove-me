import { Module } from "@nestjs/common";

import { AssignorModule } from "./assignor/assignor.module";
import { PayableModule } from "./payable/payable.module";
import { PrismaProvider } from "./providers/prisma.provider";

@Module({
  imports: [
    {
      module: class PrismaModule {},
      providers: [PrismaProvider],
      exports: [PrismaProvider],
      global: true,
    },
    PayableModule,
    AssignorModule,
  ],
})
export class AppModule {}
