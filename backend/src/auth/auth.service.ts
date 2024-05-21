import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


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


@Injectable()
export class AuthService {
    constructor(readonly userRepository : UserRepository){
      this.userRepository = userRepository
    }

    async authenticate(email: string, password: string) {
      // descobrir pq tá dando que o usuario já existe
      // ype '{ id: string; email: string; password: string; }' is missing the following properties from type 'Promise<{ id: string; email: string; password: string; }>': then, catch, finally, [Symbol.toStringTag]ts(2739)
      let user : User | null = await this.userRepository.findOneByEmail(email)
      if (user) {
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
      }

      user = await this.userRepository.create({email, password})
      return user
    }
}
