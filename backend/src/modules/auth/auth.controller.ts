import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { UserNoBaseModelDto } from '../user/dto/user-no-base-model.dto';
import { UserDto } from '../user/dto/user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({ path: '/integrations/auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiBody({ type: UserNoBaseModelDto })
  signIn(@Body() signInDto: Omit<UserDto, 'id'>) {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user')
  getProfile(@Req() req) {
    return req.user as JwtPayload;
  }
}
