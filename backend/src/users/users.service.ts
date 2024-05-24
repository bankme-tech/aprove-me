import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from '../utils';
import { AuthService } from '../auth/auth.service';
import { SafeUserDto } from './dto/safe-user.dto';
import { Role } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SafeUserDto> {
    const data = await validateDto(createUserDto, CreateUserDto);

    const passwordEncrypted = await this.authService.hashPassword(
      data.password,
    );

    const userCreated = await this.prismaService.user.create({
      data: {
        ...data,
        password: passwordEncrypted,
      },
      select: {
        assignorId: true,
        role: true,
        username: true,
      },
    });

    const response: SafeUserDto = {
      role: userCreated.role as Role,
      username: userCreated.username,
      assignorId: userCreated.assignorId,
    };

    return response;
  }

  findByUsername(username: string, includePassword = false) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
      select: {
        role: true,
        assignor: true,
        username: true,
        password: includePassword,
      },
    });
  }

  async findAll(): Promise<SafeUserDto[]> {
    const data = await this.prismaService.user.findMany({
      select: {
        assignorId: true,
        role: true,
        username: true,
      },
    });

    return data.map((user) => ({
      role: user.role as Role,
      username: user.username,
      assignorId: user.assignorId,
    }));
  }

  async update(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<SafeUserDto> {
    if (username === 'aprovame') {
      throw new Error('You cannot update the aprovame user');
    }

    const data = await validateDto(updateUserDto, UpdateUserDto);
    const response = await this.prismaService.user.update({
      where: {
        username,
      },
      data: data,
      select: {
        assignorId: true,
        role: true,
        username: true,
      },
    });

    return {
      role: response.role as Role,
      username: response.username,
      assignorId: response.assignorId,
    };
  }

  async remove(username: string): Promise<SafeUserDto> {
    if (username === 'aprovame') {
      throw new ForbiddenException('You cannot delete the aprovame user');
    }

    const data = await this.prismaService.user.delete({
      where: {
        username,
      },
    });

    return {
      role: data.role as Role,
      username: data.username,
      assignorId: data.assignorId,
    };
  }
}
