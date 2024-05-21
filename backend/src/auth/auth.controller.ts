import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator';
import { User } from '@prisma/client';


class UserDTO {
    @IsString()
    email : string

    @IsString()
    password : string
}


@Controller('integrations/auth')
export class AuthController {
    constructor(readonly authService : AuthService) {
        this.authService = authService
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    authenticate(@Body() authDTO : UserDTO) {
        return this.authService.authenticate(authDTO.email, authDTO.password)
    }

    @Post()
    login(@Body() authDTO : UserDTO) {
        return this.authService.login(authDTO.email, authDTO.password)
    }
}
