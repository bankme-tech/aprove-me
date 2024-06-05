import { Module } from "@nestjs/common";
import { PrismaModule } from "src/shared/prisma/prisma.module";
import { AssignorController } from "./assignor.controller";
import { AssignorRepository } from "./assignor.repository";
import { AssignorService } from "./assignor.service";

@Module({
    imports: [PrismaModule],
    controllers: [AssignorController],
    providers: [AssignorService, AssignorRepository],
    exports: [AssignorService]
})
export class AssignorModule {}
