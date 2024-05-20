import { AddNewUser } from '@/app/use-cases/user/add-new-user';
import { Body, Controller, Post } from '@nestjs/common';
import { AddNewUserDTO } from '@/infra/http/dto/user/add-new-user.dto';

@Controller('/user')
export class UserController {
  constructor(private addNewUser: AddNewUser) {}

  @Post()
  async create(@Body() body: AddNewUserDTO) {
    const { user } = await this.addNewUser.execute(body);
    return user;
  }
}
