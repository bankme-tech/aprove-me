import { Module } from "@nestjs/common";
import { CreatePayableController } from "./controllers/create-payable.controller";
import { PrismaProvider } from "./providers/prisma.provider";
import { FindPayableByIdController } from "./controllers/find-payable-by-id.controller";

@Module({
  controllers: [CreatePayableController, FindPayableByIdController],
  providers: [PrismaProvider],
})
export class AppModule {}
