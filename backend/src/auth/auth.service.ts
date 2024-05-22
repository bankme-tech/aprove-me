import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {

    const user = this.prisma.user.create({
        data: {
          email: data.email,
          password: data.password
        }
    })
    return user
  }

//   async findAll(): Promise<User[]> {
//     return this.prisma.user.findMany();
//   }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email : email } });
  }

//   async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
//     return this.prisma.user.update({ where: { id }, data });
//   }

//   async delete(id: string): Promise<User> {
//     return this.prisma.user.delete({ where: { id } });
//   }
}

type UserSession = Omit<User, "password"> & {
  token: string;
};


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionManager: SessionManagerService,
  ) {}

  async register(email: string, password: string): Promise<{ id: string, email: string, token: string }> {
    let user: User | null = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password + '#AproveMe', 10);
    user = await this.userRepository.create({ email, password: hashedPassword });
    const token = this.sessionManager.createSession(user);
    return { id: user.id, email: user.email, token };
  }

  async authenticate(email: string, password: string): Promise<{ id: string, email: string, token: string }> {
    const user: User | null = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compare(password + '#AproveMe', user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.sessionManager.createSession(user);
    return { id: user.id, email: user.email, token };
  }
}