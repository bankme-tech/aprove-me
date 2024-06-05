import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import "dotenv/config";
import { ReceivableModule } from "src/app/receivable/receivable.module";
import { AssignorModule } from "../../app/assignor/assignor.module";
import appConfig from "../config/app.config";
import { PrismaModule } from "../prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const InternModules = [AssignorModule, PrismaModule, ReceivableModule];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig],
            envFilePath: [".env"]
        }),
        ...InternModules
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
