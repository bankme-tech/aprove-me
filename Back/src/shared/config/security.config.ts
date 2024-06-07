import "dotenv/config";

import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";

export const securityConfigInit = (app: INestApplication) => {
    const environmentWithoutCrossOrigin = ["local", "development"];

    const configService = app.get(ConfigService);

    const frontendUrl = configService.get("app.frontendUrl");
    const environment = configService.get("app.environment");

    const hasCrossOrigin = !environmentWithoutCrossOrigin.includes(environment);

    if (hasCrossOrigin) {
        // Enable CORS - Define cross-origin headers
        app.enableCors({
            origin: frontendUrl,
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
            credentials: true
        });
    }

    // Hide X-Powered-By headers
    app.use(helmet());

    // HSTS Configuration - HTTP Strict Transport Security
    if (environment !== "local") {
        app.use(
            helmet.hsts({
                maxAge: 300,
                includeSubDomains: true,
                preload: true
            })
        );
    }

    // Size limit for request body
    // Fix error bodyParser undefined
    // app.use(bodyParser.json({ limit: "1mb" }));
    // app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
};
