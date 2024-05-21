import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { CreateAssignorDto, createAssignorSchema } from './dto';
import { JwtService } from '@nestjs/jwt';

describe('AssignorController', () => {
  let controller: AssignorController;
  let prisma: PrismaService;
  let assignorData: CreateAssignorDto[] = [
    {
      document: '447.572.650-69',
      email: faker.internet.email(),
      phone: faker.phone.number(),
      name: faker.person.fullName(),
    },
    {
      document: '204.597.970-93',
      email: faker.internet.email(),
      phone: faker.phone.number(),
      name: faker.person.fullName(),
    },
    {
      document: '312.771.680-08',
      email: faker.internet.email(),
      phone: faker.phone.number(),
      name: faker.person.fullName(),
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "Assignor"`;
  });

  afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM "Assignor"`;
    await prisma.$disconnect();
  });

  it('finds an assignor by id', async () => {
    const assignors = await prisma.assignor.createManyAndReturn({
      data: assignorData,
    });
    const assignor = assignors[1];
    const result = await controller.findById(assignor.id);

    expect(result).toEqual(assignor);
  });

  it('fails to find if assignor does not exist', async () => {
    expect(async () => {
      await controller.findById(faker.string.uuid());
    }).rejects.toThrow();
  });

  it('creates an assignor', async () => {
    const newAssignor = assignorData[0];

    const result = await controller.create(newAssignor);
    expect(result).toEqual({
      id: expect.any(String),
      ...newAssignor,
    });
  });

  it('fails to create an assignor if email is registered', async () => {
    await prisma.assignor.create({ data: assignorData[0] });
    const newAssignor: CreateAssignorDto = {
      ...assignorData[0],
      email: assignorData[1].email,
    };

    expect(async () => {
      await controller.create(newAssignor);
    }).rejects.toThrow();
  });

  it('fails to create an assignor if document is registered', async () => {
    await prisma.assignor.create({ data: assignorData[0] });
    const newAssignor: CreateAssignorDto = {
      ...assignorData[0],
      document: assignorData[1].document,
    };

    expect(async () => {
      await controller.create(newAssignor);
    }).rejects.toThrow();
  });

  it('fails to create an assignor if phone is registered', async () => {
    await prisma.assignor.create({ data: assignorData[0] });
    const newAssignor: CreateAssignorDto = {
      ...assignorData[0],
      phone: assignorData[1].phone,
    };

    expect(async () => {
      await controller.create(newAssignor);
    }).rejects.toThrow();
  });

  it('updates an assignor', async () => {
    const assignor = await prisma.assignor.create({
      data: assignorData[0],
    });
    const newEmail = faker.internet.email();
    const updatedAssignor = await controller.update(assignor.id, {
      email: newEmail,
    });

    expect(updatedAssignor).toEqual({
      ...assignor,
      email: newEmail,
    });
  });

  it('fails to update if email is registered', async () => {
    const [assignor, ...rest] = await prisma.assignor.createManyAndReturn({
      data: assignorData,
    });

    expect(async () => {
      await controller.update(assignor.id, { email: rest[0].email });
    }).rejects.toThrow();
  });

  it('fails to update if document is registered', async () => {
    const [assignor, ...rest] = await prisma.assignor.createManyAndReturn({
      data: assignorData,
    });

    expect(async () => {
      await controller.update(assignor.id, { document: rest[0].document });
    }).rejects.toThrow();
  });

  it('fails to update if phone is registered', async () => {
    const [assignor, ...rest] = await prisma.assignor.createManyAndReturn({
      data: assignorData,
    });

    expect(async () => {
      await controller.update(assignor.id, { phone: rest[0].phone });
    }).rejects.toThrow();
  });

  it('deletes an assignor', async () => {
    const { id } = await prisma.assignor.create({ data: assignorData[0] });

    await controller.delete(id);

    expect(async () => {
      await controller.findById(id);
    }).rejects.toThrow();
  });

  it('fails to delete if user does not exist', async () => {
    expect(async () => {
      await controller.delete(faker.string.uuid());
    }).rejects.toThrow();
  });
});
