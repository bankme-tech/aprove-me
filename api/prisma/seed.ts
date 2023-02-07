import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.admin.create({
    data: {
      login: process.env.ADMIN_LOGIN,
      password: process.env.ADMIN_PASSWORD,
      name: process.env.ADMIN_NAME,
    },
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
