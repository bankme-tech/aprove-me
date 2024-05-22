import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { TokenService } from './token.service';
import { ICredentials, IUnsafeUser, IUser } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  public async registerUser(credential: ICredentials): Promise<IUser> {
    const loginExists = await this.userRepository.exists({
      login: credential.login,
    });
    if (loginExists) {
      throw new UnprocessableEntityException('Login already exists');
    }

    const salt = await this.cryptoService.genSalt();
    const hashedPassword = await this.cryptoService.hash(
      credential.password,
      salt,
    );
    const user: IUnsafeUser = {
      ...credential,
      salt,
      password: hashedPassword,
    };
    const createdUser = await this.userRepository.create(user);

    return this.cleanUserSensitiveData(createdUser);
  }

  public async login(credential: ICredentials): Promise<{ token: string }> {
    const { login, password } = credential;
    await this.handleLoginSensitiveData(login, password);
    credential.password = null;

    const user = await this.userRepository.findOne({ login });
    if (!user) {
      throw new NotFoundException(
        `User not found with this login. Login: ${login}`,
      );
    }

    const token = await this.generateToken({ ...user });
    return { token };
  }

  public async generateToken(unsafeUser: IUser) {
    const user: IUser = this.cleanUserSensitiveData(unsafeUser);
    return this.tokenService.generateToken(user);
  }

  private async handleLoginSensitiveData(
    login: string,
    unhashedPassword: string | null,
  ): Promise<void> {
    if (!unhashedPassword) {
      throw new BadRequestException('Login or password are incorrect');
    }

    const userWithSensitiveData =
      await this.userRepository.findOneWithUnsafeData({ login });

    if (!userWithSensitiveData) {
      throw new NotFoundException(
        `User not found with this login. Login: ${login}`,
      );
    }
    if (!userWithSensitiveData.password || !userWithSensitiveData.salt) {
      throw new InternalServerErrorException();
    }

    const isPasswordCorrect = await this.cryptoService.compareUserPasswords(
      unhashedPassword,
      userWithSensitiveData,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Login or password are incorrect');
    }

    unhashedPassword = null;
    this.deleteUserSensitiveData(userWithSensitiveData);
  }

  private deleteUserSensitiveData(mutUser: Partial<IUnsafeUser>): void {
    delete mutUser.password;
    delete mutUser.salt;
  }

  private cleanUserSensitiveData(user: Partial<IUnsafeUser>): IUser {
    const safeUser = { ...user };
    this.deleteUserSensitiveData(safeUser);
    return safeUser as IUser;
  }
}
