import { Assignor, PrismaClient } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const assignors: Omit<Assignor, 'id'>[] = [
    {
      document: '532.937.020-58',
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
    {
      document: '00.880.306/0001-80',
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    },
  ];

  await prisma.assignor.createMany({
    data: assignors,
  });

  console.log('successfully created assignors');
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
