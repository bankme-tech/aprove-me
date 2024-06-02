import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UseCase } from '@core/shared/contracts/usecases';
import { SignToken, PermissionRepository } from '@core/auth/ports';

type AuthenticateInput = {
  login: string;
  password: string;
};

type AuthenticateOutput = {
  accessToken: string;
};

@Injectable()
export class AuthenticateUseCase
  implements UseCase<AuthenticateInput, AuthenticateOutput>
{
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly token: SignToken,
  ) {}

  async execute(input: AuthenticateInput): Promise<AuthenticateOutput> {
    const { login, password } = input;

    const permission = await this.permissionRepository.findBy(login, password);

    if (!permission) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: permission.login,
    };
    const accessToken = await this.token.signAsync(payload);

    return { accessToken };
  }
}
