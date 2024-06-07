import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PreAuthorized } from "./decorators/preAuthorized.decorator";
import { CredentialDto } from "./dto/credential.dto";

@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly service: AuthService) {}

    @Post("login")
    @PreAuthorized()
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: CredentialDto) {
        this.logger.log("Start method login");
        return await this.service.login(loginDto);
    }

    @Get("verify-token")
    @HttpCode(HttpStatus.OK)
    async verifyToken(): Promise<boolean> {
        this.logger.log("Start method verifyToken");
        return true;
    }
}
