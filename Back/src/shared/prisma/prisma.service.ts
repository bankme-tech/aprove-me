import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({
            log: [
                { emit: "event", level: "query" },
                { emit: "event", level: "error" },
                { emit: "event", level: "info" },
                { emit: "event", level: "warn" }
            ]
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log("Database connection established successfully");
        } catch (error) {
            this.logger.error("Failed to connect to the database", error);
        }

        this.$on("error", (event) => {
            this.logger.error(event.message);
        });
        this.$on("warn", (event) => {
            this.logger.warn(event.message);
        });
        this.$on("info", (event) => {
            this.logger.debug(event.message);
        });
        this.$on("query", (event) => {
            this.logger.log(`Query: ${event.query} Params: ${event.params}`);
        });
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
