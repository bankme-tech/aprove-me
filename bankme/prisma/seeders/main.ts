import { PrismaClient } from '@prisma/client';
import assignorSeed from './assignor.seed';

const prisma = new PrismaClient();

async function main() {
  await assignorSeed();
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
