import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
beforeAll(async () => {
  await prisma.payable.deleteMany()
  await prisma.assignor.deleteMany()
})
