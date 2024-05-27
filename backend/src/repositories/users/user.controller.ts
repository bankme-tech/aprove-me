import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Get,
  HttpCode,
  Param,
  Put,
  Delete,
  Query,
  NotFoundException,
  HttpException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../DTOs/user';
import { JwtAuthGuard } from '../../auth/AuthGuard';
import { UserService } from './user.service';

@Controller('integrations')
export class UserController {
  constructor(private user: UserService) {}

  @ApiTags('User')
  @Post('users')
  async createUser(@Body() body: UserDto) {
    try {
      const { login } = body;
      const lowerCaseLogin = login.toLowerCase();
      const userExist = await this.user.getUserByLogin(lowerCaseLogin);

      if (userExist) {
        throw new BadRequestException('User already exists');
      }
      const user = { ...body, login: lowerCaseLogin };
      const createUser = await this.user.createUser(user);

      return createUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Get('users')
  @HttpCode(HttpStatus.OK)
  async getUserAll() {
    try {
      const users = await this.user.getUsersAll();
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Get('users/:id')
  @ApiBearerAuth('bearer')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number) {
    try {
      const user = await this.user.getUserById(+id);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Get('users/search/login')
  @HttpCode(HttpStatus.OK)
  async getUserByLogin(@Query('login') login: string) {
    try {
      const user = await this.user.getUserByLogin(login);

      if (!user) {
        throw new NotFoundException(`User with login ${login} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return error.message;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Put('users/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: number, @Body() body: UserDto) {
    try {
      const userExist = await this.user.getUserById(+id);

      if (!userExist) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const user = await this.user.updateUser(+id, body);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('User')
  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number) {
    try {
      const userExist = await this.user.getUserById(+id);

      if (!userExist) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.user.deleteUser(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
