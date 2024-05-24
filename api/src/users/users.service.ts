import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../db/prisma.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createUserDto: CreateUserDto) {
    const user = plainToClass(CreateUserDto, createUserDto);

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(
          (err) =>
            `${err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(', ')}`,
        ),
      );
    }

    const { login } = createUserDto;
    const userExists = await this.prisma.user.findUnique({
      where: { login },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findOne(login: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { login },
    });
  }

  async update(id: string, password: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { password },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
