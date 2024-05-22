import { Module } from "@nestjs/common";

import { CreatePayableController } from "./controllers/create-payable.controller";
import { FindAssignorByIdController } from "./controllers/find-assignor-by-id.controller";
import { FindPayableByIdController } from "./controllers/find-payable-by-id.controller";
import { UpdatePayableByIdController } from "./controllers/update-payable-by-id.controller";
import { PrismaProvider } from "./providers/prisma.provider";

@Module({
  controllers: [
    CreatePayableController,
    FindPayableByIdController,
    FindAssignorByIdController,
    UpdatePayableByIdController,
  ],
  providers: [PrismaProvider],
})
export class AppModule {}
