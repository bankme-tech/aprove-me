import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
}
}