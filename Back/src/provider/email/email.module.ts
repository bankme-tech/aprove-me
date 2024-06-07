import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get("email.host"),
                    port: configService.get("email.port"),
                    ignoreTLS: false,
                    secure: false,
                    auth: {
                        user: configService.get("email.username"),
                        pass: configService.get("email.password")
                    }
                },
                preview: false
            }),
            inject: [ConfigService]
        })
    ],
    providers: [EmailService],
    exports: [EmailService]
})
export class EmailModule {}
