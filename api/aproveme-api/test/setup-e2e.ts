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

beforeEach(async () => {
  prisma.$connect;
  try {
    // Executar migrações no banco de dados de teste
    execSync("npx prisma migrate deploy");
  } catch (error) {
    console.error("Failed to run migrations:", error);
  }
});

afterEach(async () => {
  try {
    // Apagar todas as linhas de todas as tabelas
    const tables = await prisma.$queryRaw<{ name: string }[]>`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
    `;

    for (const { name } of tables) {
      await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`);
    }
  } catch (error) {
    console.error("Failed to clean up the database:", error);
  } finally {
    await prisma.$disconnect();
  }
});

export default prisma;
