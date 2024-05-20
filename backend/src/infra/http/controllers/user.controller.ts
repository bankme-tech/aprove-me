import { AddNewUser } from '@/app/use-cases/user/add-new-user';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AddNewUserDTO } from '@/infra/http/dto/user/add-new-user.dto';
import { loginUserDTO } from '@/infra/http/dto/user/user-login.dto';
import { LoginUser } from '@/app/use-cases/user/login-user';

@Controller('/user')
export class UserController {
  constructor(
    private addNewUser: AddNewUser,
    private loginUser: LoginUser,
  ) {}

  @Post()
  async create(@Body() body: AddNewUserDTO) {
    const { user } = await this.addNewUser.execute(body);
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: loginUserDTO) {
    const { acessToken } = await this.loginUser.execute(body);

    return { acessToken };
  }
}
