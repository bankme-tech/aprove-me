import { registerAs } from "@nestjs/config";

export default registerAs("email", () => ({
    username: process.env.SES_SMTP_USERNAME,
    password: process.env.SES_SMTP_PASSWORD,
    from: process.env.SES_FROM_MAIL,
    host: process.env.SES_HOST,
    port: process.env.SES_PORT
}));
