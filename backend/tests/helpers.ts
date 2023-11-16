import { PrismaService } from '../src/prisma/prisma.service';

export async function cleanDB(prismaService: PrismaService) {
  await prismaService.payable.deleteMany();
  await prismaService.assignor.deleteMany();
}
