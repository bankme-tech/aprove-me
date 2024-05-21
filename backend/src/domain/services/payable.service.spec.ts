import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaPayableRepository } from '../../infrastructure/repositories/prisma-payable.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
describe('PayableService', () => {
  let payableService: PayableService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        PayableService,
        {
          provide: 'PayableRepository',
          useClass: PrismaPayableRepository,
        },
      ],
    }).compile();

    payableService = moduleFixture.get<PayableService>(PayableService);
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(payableService).toBeDefined();
  });

  it('should create a new payable', async () => {
    prisma.payable.create = jest.fn().mockResolvedValue({
      id: '1db81bd7-03dd-43dc-b3b0-ee4334e54999',
      value: 567.96,
      emissionDate: new Date().toISOString(),
      assignor: '9f59c891-2a20-4256-bc55-14a4720d5c42',
    });

    await payableService.createPayable({
      value: 567.96,
      emissionDate: new Date(new Date().toISOString()),
      assignor: '9f59c891-2a20-4256-bc55-14a4720d5c42',
    });

    expect(prisma.payable.create).toHaveBeenCalled();
  });

  it('should list a payable by id', async () => {
    prisma.payable.findUnique = jest.fn().mockResolvedValue({
      id: '1db81bd7-03dd-43dc-b3b0-ee4334e54999',
      value: 395.67,
      emissionDate: '2024-05-20T23:37:21.195Z',
      assignor: '9f59c891-2a20-4256-bc55-14a4720d5c42',
    });

    const payable = await payableService.findById(
      '1db81bd7-03dd-43dc-b3b0-ee4334e54999',
    );

    expect(payable).toMatchObject({
      id: '1db81bd7-03dd-43dc-b3b0-ee4334e54999',
      value: 395.67,
      emissionDate: '2024-05-20T23:37:21.195Z',
      assignor: '9f59c891-2a20-4256-bc55-14a4720d5c42',
    });
  });

  it('should update a payable', async () => {
    const updatedPayable = {
      id: '1db81bd7-03dd-43dc-b3b0-ee4334e54999',
      value: 365.67,
      emissionDate: new Date(new Date().toISOString()),
      assignor: '9f59c891-2a20-4256-bc55-14a4720d5c42',
    };

  
    prisma.assignor.update = jest.fn().mockResolvedValue(updatedPayable);

    const result = await payableService.update(
      '1db81bd7-03dd-43dc-b3b0-ee4334e54999',
      updatedPayable as any,
    );

    expect(result).toMatchObject(updatedPayable);
  });

  it('should delete a payable', async () => {
    prisma.payable.delete = jest.fn().mockResolvedValue(undefined);
    await payableService.delete('1db81bd7-03dd-43dc-b3b0-ee4334e54999');
    expect(prisma.payable.delete).toHaveBeenCalled();
  });
});
