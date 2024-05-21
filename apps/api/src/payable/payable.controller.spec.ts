import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { PayableService } from './payable.service';
import { CreateAssignorDto } from '../assignor/dto';
import { CreatePayableDto } from './dto';
import { JwtService } from '@nestjs/jwt';

describe('PayableController', () => {
  let controller: PayableController;
  let prisma: PrismaService;
  let assignor: CreateAssignorDto & { id: string };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService, PrismaService, JwtService],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    prisma = module.get<PrismaService>(PrismaService);

    assignor = await prisma.assignor.create({
      data: {
        document: '312.771.680-08',
        email: faker.internet.email(),
        phone: faker.phone.number(),
        name: faker.person.fullName(),
      },
    });
  });

  beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "Payable"`;
  });

  afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM "Payable"`;
    await prisma.$executeRaw`DELETE FROM "Assignor"`;
    await prisma.$disconnect();
  });

  it('finds a payable by id', async () => {
    const payable = await prisma.payable.create({
      data: {
        emissionDate: new Date(),
        value: 200.11,
        assignorId: assignor.id,
      },
    });

    expect(await controller.findById(payable.id)).toEqual(payable);
  });

  it('fails to find if payable does not exist', async () => {
    expect(async () => {
      await controller.findById(faker.string.uuid());
    }).rejects.toThrow();
  });

  it('creates a payable', async () => {
    const newPayable: CreatePayableDto = {
      emissionDate: new Date().toISOString(),
      value: 300,
      assignorId: assignor.id,
    };

    const result = await controller.create(newPayable);

    expect(result).toEqual({
      ...newPayable,
      id: expect.any(String),
      emissionDate: new Date(newPayable.emissionDate),
    });
  });

  it('fails to create a payable if assignor does not exist', async () => {
    expect(async () => {
      await controller.create({
        emissionDate: new Date().toISOString(),
        value: 300,
        assignorId: faker.string.uuid(),
      });
    }).rejects.toThrow();
  });

  it('updates a payable', async () => {
    const payable = await prisma.payable.create({
      data: {
        emissionDate: new Date().toISOString(),
        value: 300,
        assignorId: assignor.id,
      },
    });

    const result = await controller.update(payable.id, { value: 200 });

    expect(result).toEqual({
      ...payable,
      value: 200,
    });
  });

  it('deletes a payable', async () => {
    const { id } = await prisma.payable.create({
      data: {
        emissionDate: new Date().toISOString(),
        value: 300,
        assignorId: assignor.id,
      },
    });
    await controller.delete(id);

    expect(async () => {
      await controller.findById(id);
    }).rejects.toThrow();
  });

  it('fails to delete if payable does not exist', async () => {
    expect(async () => {
      await controller.delete(faker.string.uuid());
    }).rejects.toThrow();
  });
});
