import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  await prisma.assignor.createMany({
    data: [
      {
        id: '4cd87666-578b-4200-b38f-c9797b39b38a',
        document: '000.000.000.13',
        email: 'rafa@prisma.io',
        name: 'Rafa',
        password: bcrypt.hashSync('senhadificil'),
        phone: '(75) 9 8810-1718',
      },
      {
        id: '7ea87666-459c-4200-b38f-c0097b39b38a',
        document: '000.000.000.25',
        email: 'aprovame@aprovame.com',
        name: 'Dan Miranda',
        password: bcrypt.hashSync('aprovame'),
        phone: '(75) 9 9910-1314',
      },
    ],
  });

  await prisma.payable.createMany({
    data: [
      {
        assignorId: '4cd87666-578b-4200-b38f-c9797b39b38a',
        emissionDate: new Date(),
        value: 10000,
      },
      {
        assignorId: '4cd87666-578b-4200-b38f-c9797b39b38a',
        emissionDate: new Date(1999, 6, 10),
        value: 500,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
