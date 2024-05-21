import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { AssignorMapper } from '~/modules/assignor/mappers/assignor.mapper';
import { makeAssignor } from '~/modules/assignor/test/factories/make-assignor';

const prisma = new PrismaClient();

async function main() {
  const plainPassword = 'aprovame';

  const hashedPassword = await hash(plainPassword, 8);

  const account = await prisma.account.upsert({
    where: { login: 'aprovame' },
    update: {},
    create: {
      login: 'aprovame',
      password: hashedPassword,
    },
  });

  await prisma.assignor.createMany({
    data: [makeAssignor(), makeAssignor(), makeAssignor()].map(
      AssignorMapper.toPersistence,
    ),
  });

  console.log('Account seed created!');

  console.table({
    accountId: account.id,
    login: account.login,
    password: plainPassword,
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
