import { Injectable } from '@nestjs/common';
import { AuthInputDTO } from './dto/auth.input.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthOutputDTO } from './dto/auth.output.dto';
import { UnauthorizedError } from './errors/unauthorized.error';
import { IUserRepository } from 'src/user/repositories/user.repository.interface';
import { IUserEncrypter } from 'src/user/encrypters/user.encrypter.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypter: IUserEncrypter,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(authDTO: AuthInputDTO): Promise<AuthOutputDTO> {
    const user = await this.userRepository.findByLogin(authDTO.login);

    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordValid = await this.encrypter.compare(
      authDTO.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    const token = await this.jwtService.signAsync({
      login: authDTO.login,
      password: authDTO.password,
    });

    return {
      token,
    };
  }
}
