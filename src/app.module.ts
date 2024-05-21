import { Module } from "@nestjs/common";
import { CreatePayableController } from "./create-payable.controller";
import { PrismaProvider } from "./providers/prisma.provider";

@Module({
  controllers: [CreatePayableController],
  providers: [PrismaProvider],
})
export class AppModule {}
