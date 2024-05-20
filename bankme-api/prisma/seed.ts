import * as faker from 'faker';
import * as dotenv from 'dotenv';
import prisma from '../src/client';

const fakerUser = (): any => ({
  username: faker.name.firstName(),
  password: faker.internet.password(),
});

const fakerAssignor = (): any => ({
  document: '0000000000',
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  name: faker.name.firstName()
});

const startDate = new Date(2018, 0, 1); 
const endDate = new Date(2023, 11, 31); 

const fakerPayable = (assignorId: number): any => ({
  value: parseFloat(faker.commerce.price()),
  emissionDate: faker.date.between(startDate, endDate),
  assignorId
});

async function main() {
  const fakerRounds = 5;
  dotenv.config();
  console.log('Seeding...');

  await prisma.user.create({ data: { username: 'admin', password: 'admin' }});

  for (let i = 0; i < fakerRounds; i += 1) {
    await prisma.user.create({ data: fakerUser() });
  }

  for (let i = 0; i < fakerRounds; i += 1) {
    const assignor = await prisma.assignor.create({ data: fakerAssignor() });

    await prisma.payable.create({ data: fakerPayable(assignor.id) })
  }
}

main()
.catch((e) => console.error(e))
.finally(async () => {
console.log('Seed Completo.')
await prisma.$disconnect();
});