import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.payable.deleteMany();
    await prisma.assignor.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database cleaned.');
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
