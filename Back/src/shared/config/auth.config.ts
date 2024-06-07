import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
    expirationMinutes: process.env.ACCESS_TOKEN_EXPIRATION_MINUTES,
    jwtSecret: process.env.JWT_SECRET
}));
