import { PrismaClient, Payable, Assignor } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const assignors: Assignor[] = [
    {
      id: uuidv4(),
      name: 'João da Silva',
      document: '123.456.789-09',
      email: 'joao.silva@example.com',
      phone: '(11) 91234-5678',
    },
    {
      id: uuidv4(),
      name: 'Maria Oliveira',
      document: '987.654.321-00',
      email: 'maria.oliveira@example.com',
      phone: '(21) 98765-4321',
    },
    {
      id: uuidv4(),
      name: 'Carlos Santos',
      document: '111.222.333-44',
      email: 'carlos.santos@example.com',
      phone: '(31) 99876-5432',
    },
  ];

  // Create assignors first
  const createdAssignors = await Promise.all(
    assignors.map((assignor) => prisma.assignor.create({ data: assignor })),
  );

  // Creating 5 payables with reference to created assignors
  const payables: Payable[] = [
    {
      id: uuidv4(),
      value: 1500.0,
      emissionDate: new Date('2024-06-01T00:00:00.000Z'),
      assignorId: createdAssignors[0].id, // João da Silva
    },
    {
      id: uuidv4(),
      value: 2300.5,
      emissionDate: new Date('2024-06-15T00:00:00.000Z'),
      assignorId: createdAssignors[1].id, // Maria Oliveira
    },
    {
      id: uuidv4(),
      value: 870.75,
      emissionDate: new Date('2024-07-01T00:00:00.000Z'),
      assignorId: createdAssignors[2].id, // Carlos Santos
    },
    {
      id: uuidv4(),
      value: 1250.0,
      emissionDate: new Date('2024-07-20T00:00:00.000Z'),
      assignorId: createdAssignors[0].id, // João da Silva
    },
    {
      id: uuidv4(),
      value: 3200.0,
      emissionDate: new Date('2024-08-05T00:00:00.000Z'),
      assignorId: createdAssignors[1].id, // Maria Oliveira
    },
  ];

  for (const payable of payables) {
    await prisma.payable.create({
      data: payable,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
