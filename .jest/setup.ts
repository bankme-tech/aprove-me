import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });
const prisma = new PrismaClient();

async function setup() {
  try {
    await prisma.assignor.deleteMany();
    await prisma.receivable.deleteMany();
  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setup();
