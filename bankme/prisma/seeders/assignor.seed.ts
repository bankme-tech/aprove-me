import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function assignorSeed() {
  await prisma.assignor.createMany({
    data: [
      {
        id: '9fe7de00-6f6c-45e2-8dfe-737f945614ef',
        name: 'Fulano',
        email: 'email@email.com',
        document: 'sdfadsfasd',
        phone: '99999999999',
        password: await bcrypt.hash('123456', 10),
        // password: '123456',
      },
    ],
  });
}
