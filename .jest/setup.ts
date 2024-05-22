import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
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
