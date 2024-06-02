import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@core/auth/ports';
import { UseCase } from '@core/shared/contracts/usecases';

type RegisterPermissionInput = {
  login: string;
  password: string;
};

@Injectable()
export class RegisterPermissionUseCase
  implements UseCase<RegisterPermissionInput, void>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(input: RegisterPermissionInput): Promise<void> {
    const { login, password } = input;

    await this.permissionRepository.register(login, password);
  }
}
