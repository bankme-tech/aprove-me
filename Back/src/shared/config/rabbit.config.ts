import { registerAs } from "@nestjs/config";

export default registerAs("rabbitmq", () => ({
    exchange: process.env.EXCHANGE_URL,
    saveReceivableQueueName: "save-receivable-queue"
}));
