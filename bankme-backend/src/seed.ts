import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: {
      email: 'joao@gmail.com',
      password: 'joao123',
      name: 'João',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'maria@gmail.com',
      password: 'maria123',
      name: 'Maria',
    },
  });

  const assignor1 = await prisma.assignor.create({
    data: {
      document: '1234567890',
      email: 'assignor1@example.com',
      phone: '123-456-7890',
      name: 'Assignor One',
      userId: user1.id,
    },
  });

  const assignor2 = await prisma.assignor.create({
    data: {
      document: '0987654321',
      email: 'assignor2@example.com',
      phone: '098-765-4321',
      name: 'Assignor Two',
      userId: user2.id,
    },
  });

  await prisma.payable.createMany({
    data: [
      {
        value: 100.00,
        valueInCents: 10000,
        emissionDate: new Date(),
        userId: user1.id,
        assignorId: assignor1.id,
      },
      {
        value: 200.00,
        valueInCents: 20000,
        emissionDate: new Date(),
        userId: user2.id,
        assignorId: assignor2.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
