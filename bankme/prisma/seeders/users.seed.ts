import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function userSeed() {
  await prisma.user.createMany({
    data: [
      {
        id: 'f1175035a6a667fa33579bfc416bf490',
        name: 'user01',
        email: 'email@email.com',
        password: await bcrypt.hash('123456', 10),
        // password: '123456',
      },
      {
        id: '625c8273f0b0e9f6037f271c7b1f05c3',
        name: 'user02',
        email: 'email2@email.com',
        password: await bcrypt.hash('123456', 10),
        // password: '123456',
      },
    ],
  });
}
