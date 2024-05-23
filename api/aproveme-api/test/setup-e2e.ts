import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { envSchema } from "@/infra/env/env";

// Carregar variáveis de ambiente para testes
config({
  path: ".env.test",
  override: true,
});

const env = envSchema.parse(process.env);

const prisma = new PrismaClient();

beforeAll(async () => {
  try {
    execSync("npx prisma migrate dev");
  } catch (error) {
    console.error("Failed to run migrations:", error);
  } finally {
    await prisma.$connect();
  }
});

beforeEach(async () => {
  try {
    // Deletar tabelas na ordem correta para evitar problemas de chave estrangeira
    await prisma.assignor.deleteMany();
    await prisma.user.deleteMany();
    await prisma.payable.deleteMany();
  } catch (error) {
    console.error("Failed to clean up the database:", error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

export default prisma;
