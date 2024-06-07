import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
    prodEnvironmentName: "production",
    localEnvironmentName: "local"
}));
