import {
  Controller,
  Body,
  Post,
  HttpStatus,
  NotFoundException,
  HttpException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../DTOs/user';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/AuthGuard';

@Controller('integrations')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiTags('Auth')
  @Post('auth')
  async auth(@Body() body: UserDto) {
    try {
      const response = await this.authService.authenticate(body);

      if (response) {
        return response;
      }

      if (!response) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Authentication failed: Incorrect username or password',
        };
      }
      throw new NotFoundException();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
