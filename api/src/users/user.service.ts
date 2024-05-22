import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          salt: salt,
        },
      });
      return user;
    } catch (error) {
      if (
        error.code === 'P2002' && 
        error.meta?.target?.includes('email')
      ) {
        throw new BadRequestException('E-mail já está em uso');
      }
      throw error;
    }
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
