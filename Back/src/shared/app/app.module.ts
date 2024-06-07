import { ReceivableModule } from "@/app/receivable/receivable.module";
import { AuthModule } from "@/authentication/auth/auth.module";
import { TokenModule } from "@/authentication/token/token.module";
import { UserModule } from "@/authentication/user/user.module";
import { ReceivableConsumerModule } from "@/consumer/receivable/receivable.consumer.module";
import { ReceivableProducerModule } from "@/producer/receivable/receivable.producer.module";
import { EmailModule } from "@/provider/email/email.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import "dotenv/config";
import { AssignorModule } from "../../app/assignor/assignor.module";
import appConfig from "../config/app.config";
import authConfig from "../config/auth.config";
import emailConfig from "../config/email.config";
import rabbitConfig from "../config/rabbit.config";
import { PrismaModule } from "../prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const Modules = [
    AssignorModule,
    AuthModule,
    EmailModule,
    PrismaModule,
    ReceivableConsumerModule,
    ReceivableModule,
    ReceivableProducerModule,
    TokenModule,
    UserModule
];
const Configs = [appConfig, authConfig, emailConfig, rabbitConfig];

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
