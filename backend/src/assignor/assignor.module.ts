import { Module } from "@nestjs/common";
import { AssignorController } from "./assignor.controller";
import { AssignorService } from "./assignor.service";

@Module({
    controllers: [AssignorController],
    providers: [AssignorService]
})
export class AssignorModule {}