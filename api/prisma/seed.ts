import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.assignor.deleteMany();

    const assignors = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        document: '12345678901',
        email: 'assignor1@example.com',
        phone: '1234567890',
        name: 'Assignor One',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        document: '23456789018',
        email: 'assignor2@example.com',
        phone: '0987654321',
        name: 'Assignor Two',
      },
    ];

    for (const assignor of assignors) {
      await prisma.assignor.create({
        data: assignor,
      });
    }

    console.log('Seed completed');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
