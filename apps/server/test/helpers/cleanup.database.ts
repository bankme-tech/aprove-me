import { PrismaService } from '@/database/prisma.service'

export async function cleanupDatabase(database: PrismaService) {
  await database.payable.deleteMany()
  await database.assignor.deleteMany()
}
