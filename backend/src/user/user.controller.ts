import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDTO } from './dto/create-user.input.dto';
import { CreateUserOuputDTO } from './dto/create-user.output.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() userInputDTO: CreateUserInputDTO,
  ): Promise<CreateUserOuputDTO> {
    return await this.userService.create(userInputDTO);
  }
}
