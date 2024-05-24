import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Limpar registros existentes
    await prisma.payable.deleteMany();
    await prisma.assignor.deleteMany();
    await prisma.user.deleteMany();

    // Criar um usuário de exemplo
    const hashedPassword = await bcrypt.hash('password', 10);
    await prisma.user.createMany({
      data: [
        {
          login: 'aprovame',
          password: 'aprovame',
        },
        {
          login: 'testuser',
          password: hashedPassword,
        },
      ],
    });

    await prisma.assignor.createMany({
      data: [
        {
          id: 'assignor1',
          name: 'Assignor One',
          document: '12345678901',
          email: 'assignor1@example.com',
          phone: '1234567890',
        },
        {
          id: 'assignor2',
          name: 'Assignor Two',
          document: '10987654321',
          email: 'assignor2@example.com',
          phone: '0987654321',
        },
        {
          id: 'assignor3',
          name: 'Assignor Three',
          document: '11111111111',
          email: 'assignor3@example.com',
          phone: '1111111111',
        },
        {
          id: 'assignor4',
          name: 'Assignor Four',
          document: '22222222222',
          email: 'assignor4@example.com',
          phone: '2222222222',
        },
        {
          id: 'assignor5',
          name: 'Assignor Five',
          document: '33333333333',
          email: 'assignor5@example.com',
          phone: '3333333333',
        },
        {
          id: 'assignor6',
          name: 'Assignor Six',
          document: '44444444444',
          email: 'assignor6@example.com',
          phone: '4444444444',
        },
        {
          id: 'assignor7',
          name: 'Assignor Seven',
          document: '55555555555',
          email: 'assignor7@example.com',
          phone: '5555555555',
        },
        {
          id: 'assignor8',
          name: 'Assignor Eight',
          document: '66666666666',
          email: 'assignor8@example.com',
          phone: '6666666666',
        },
        {
          id: 'assignor9',
          name: 'Assignor Nine',
          document: '77777777777',
          email: 'assignor9@example.com',
          phone: '7777777777',
        },
        {
          id: 'assignor10',
          name: 'Assignor Ten',
          document: '88888888888',
          email: 'assignor10@example.com',
          phone: '8888888888',
        },
      ],
    });

    const assignorIds = await prisma.assignor.findMany({
      select: { id: true },
    });

    for (const assignor of assignorIds) {
      await prisma.payable.createMany({
        data: [
          {
            value: 1000.5,
            emissionDate: new Date('2023-01-01'),
            assignorId: assignor.id,
          },
          {
            value: 2000.75,
            emissionDate: new Date('2023-02-01'),
            assignorId: assignor.id,
          },
          {
            value: 1500.0,
            emissionDate: new Date('2023-03-01'),
            assignorId: assignor.id,
          },
          {
            value: 2500.0,
            emissionDate: new Date('2023-04-01'),
            assignorId: assignor.id,
          },
          {
            value: 3000.0,
            emissionDate: new Date('2023-05-01'),
            assignorId: assignor.id,
          },
        ],
      });
    }

    console.log('Database has been seeded.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
