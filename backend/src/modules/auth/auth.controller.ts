import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({ path: '/integrations/auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: OmitType(UserDto, ['id']) })
  @Post()
  signIn(@Body() signInDto: Omit<UserDto, 'id'>) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access_token')
  @ApiBody({ type: OmitType(UserDto, ['id']) })
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
