import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly service: AppService) {}

    @Get("health-check")
    @HttpCode(HttpStatus.OK)
    async healthCheckServer(): Promise<string> {
        return await this.service.serverIsRunning();
    }
}
