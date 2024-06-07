import { HttpStatus, ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "./shared/app/app.module";
import { consumerConfigInit } from "./shared/config/consumer.config";
import { securityConfigInit } from "./shared/config/security.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    process.on("uncaughtException", (error) => {
        console.error("Unhandled Error - Something unexpected occurred.", error);
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED
        })
    );

    app.enableVersioning({
        type: VersioningType.URI
    });

    const configService = app.get(ConfigService);

    securityConfigInit(app);
    consumerConfigInit(app);

    const port = configService.get("app.port");

    await app.startAllMicroservices();
    await app.listen(port);
}

bootstrap();
