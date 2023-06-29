import { PrismaClient } from '@prisma/client';

const dbConnection = new PrismaClient();

export default dbConnection;
