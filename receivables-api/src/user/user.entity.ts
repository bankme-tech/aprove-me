import { Prisma } from '@prisma/client';

export class UserEntity implements Prisma.UserCreateInput {
  login: string;
  senha: string;
}
