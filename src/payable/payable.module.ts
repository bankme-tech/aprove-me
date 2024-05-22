import { Module } from "@nestjs/common";

import { CreatePayableModule } from "./create/create-payable.module";
import { FindPayableByIdModule } from "./find-by-id/find-payable-by-id.module";
import { UpdatePayableByIdModule } from "./update-by-id/update-payable-by-id.module";

@Module({
  imports: [
    CreatePayableModule,
    FindPayableByIdModule,
    UpdatePayableByIdModule,
  ],
})
export class PayableModule {}
