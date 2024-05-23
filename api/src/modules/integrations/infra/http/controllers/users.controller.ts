import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto, createUserDto } from '../dtos/create-user.dto';
import { UsersViewModel } from '../view-models/users.view-model';
import { CreateUserUseCase } from '@/modules/integrations/use-cases/create-user.use-case';

@Controller('integrations/users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body(new ZodValidationPipe(createUserDto)) body: CreateUserDto,
  ) {
    const user = await this.createUserUseCase.execute(body);

    return UsersViewModel.toHTTP(user);
  }
}
