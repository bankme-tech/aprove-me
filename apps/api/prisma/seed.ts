import { Assignor, PrismaClient } from '@prisma/client';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('bankme123', 8);
  const user = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: faker.person.fullName(),
      password,
    },
  });

  await prisma.assignor.createMany({
    data: [
      {
        userId: user.id,
        document: '532.937.020-58',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
      },
      {
        userId: user.id,
        document: '00.880.306/0001-80',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
      },
    ],
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
