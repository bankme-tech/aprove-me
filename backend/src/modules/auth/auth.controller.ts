import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { JwtPayload } from 'src/types/jwt-payload.types';
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
  @ApiBody({ type: OmitType(UserDto, ['id']) })
  @Get('user')
  getProfile(@Req() req) {
    return req.user as JwtPayload;
  }
}
