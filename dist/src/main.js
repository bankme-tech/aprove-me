"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    dotenv.config();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Aprove-me API')
        .setDescription('Uma API para aprovação no processo seletivo.')
        .setVersion('v1')
        .addTag('User', 'Endpoints relacionados a usuários')
        .addTag('Assignors', 'Endpoints relacionados aos cedentes')
        .addTag('Payables', 'Endpoints relacionados a recebíveis')
        .addTag('Auth', 'Endpoints relacionados a autenticação')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map