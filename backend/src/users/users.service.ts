import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateDto } from 'src/utils';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = await validateDto(createUserDto, CreateUserDto);

    const passwordEncrypted = await this.authService.hashPassword(
      data.password,
    );

    return this.prismaService.user.create({
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

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        assignorId: true,
        role: true,
        username: true,
      },
    });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const data = await validateDto(updateUserDto, UpdateUserDto);
    return await this.prismaService.user.update({
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
  }

  remove(username: string) {
    return this.prismaService.user.delete({
      where: {
        username,
      },
    });
  }
}
