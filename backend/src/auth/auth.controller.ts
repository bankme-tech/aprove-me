import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  NotFoundException,
  HttpException,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserDto } from '../DTOs/user';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from '../auth/AuthGuard';
import { JwtStrategy } from './jwt.strategy';

@Controller('integrations')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}

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

  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async perfil(@Req() req: any) {
    try {
      const token = req.token;
      const decoded = this.jwtStrategy.decodeToken(token);
      if (decoded) {
        return decoded;
      }
      return null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
