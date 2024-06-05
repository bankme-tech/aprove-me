import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { PreAuthorized } from "../auth/decorators/preAuthorized.decorator";
import { UserCreateDto } from "./dto/userCreate.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly service: UserService) {}

    @Post()
    @PreAuthorized()
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() user: UserCreateDto) {
        this.logger.log("Start method register");
        return await this.service.save(user);
    }
}
