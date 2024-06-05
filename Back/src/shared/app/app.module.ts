import { ReceivableModule } from "@/app/receivable/receivable.module";
import { AuthModule } from "@/authentication/auth/auth.module";
import { TokenModule } from "@/authentication/token/token.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import "dotenv/config";
import { AssignorModule } from "../../app/assignor/assignor.module";
import appConfig from "../config/app.config";
import authConfig from "../config/auth.config";
import { PrismaModule } from "../prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "@/authentication/user/user.module";

const Modules = [AssignorModule, AuthModule, PrismaModule, ReceivableModule, TokenModule, UserModule];
const Configs = [appConfig, authConfig];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: Configs,
            envFilePath: [".env"]
        }),
        ...Modules
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
