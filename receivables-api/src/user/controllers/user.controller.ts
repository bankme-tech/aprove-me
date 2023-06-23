import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../user.entity';
import { UserService } from '../service/user.service';

@Controller('integrations/register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<UserEntity> {
    try {
      const user: UserEntity = { ...userDto };
      return await this.userService.createUser(user);
    } catch (error) {
      throw new BadRequestException(
        'Não foi possível criar o usuario. Verifique os dados e tente novamente.',
      );
    }
  }
}
