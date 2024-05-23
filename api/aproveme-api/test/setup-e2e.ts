import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { envSchema } from "@/infra/env/env";
import { before } from "node:test";

// Carregar variáveis de ambiente para testes
config({
  path: ".env.test",
  override: true,
});

const env = envSchema.parse(process.env);

const prisma = new PrismaClient();

beforeAll(async () => {
  try {
    await prisma.$connect();

    // Executar migrações no banco de dados de teste
    execSync("npx prisma migrate deploy");
  } catch (error) {
    console.error("Failed to run migrations:", error);
  }
});

beforeEach(async () => {
  try {
    // Deletar tabelas na ordem correta para evitar problemas de chave estrangeira
    await prisma.payable.deleteMany();
    await prisma.assignor.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.error("Failed to clean up the database:", error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

export default prisma;
