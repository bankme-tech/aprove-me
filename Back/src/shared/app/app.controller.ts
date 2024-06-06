import { PreAuthorized } from "@/authentication/auth/decorators/preAuthorized.decorator";
import { Controller, Get, HttpCode, HttpStatus, Logger } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    constructor(private readonly service: AppService) {}

    @Get("health-check")
    @PreAuthorized()
    @HttpCode(HttpStatus.OK)
    async healthCheckServer(): Promise<string> {
        this.logger.log("Start method healthCheckServer");
        return await this.service.serverIsRunning();
    }

    @Get()
    @PreAuthorized()
    @HttpCode(HttpStatus.OK)
    async serverIsRunning(): Promise<string> {
        this.logger.log("Start method serverIsRunning");
        return await this.service.serverIsRunning();
    }
}
