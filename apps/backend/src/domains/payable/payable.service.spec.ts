import { Test } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('PayableService', () => {
  let payableService: PayableService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PayableService, PrismaService, JwtService],
    }).compile();

    payableService = moduleRef.get<PayableService>(PayableService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('index', () => {
    it('it should return the payable empty paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 0, total: 0 };

      jest
        .spyOn(prismaService.payable, 'findMany')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => []);
      jest
        .spyOn(prismaService.payable, 'aggregate')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({
          _count: {
            id: 0,
          },
        }));

      const response = await payableService.index(metadata);

      expect(response).toStrictEqual([[], metadata]);
    });

    it('it should return the payable containing entries paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 1, total: 1 };
      const data = {
        id: '123123',
        value: 123123,
        emissionDate: new Date(),
        assignor_id: '1231321',
      };

      jest
        .spyOn(prismaService.payable, 'findMany')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => [data]);
      jest
        .spyOn(prismaService.payable, 'aggregate')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({
          _count: {
            id: 1,
          },
        }));

      const response = await payableService.index(metadata);

      expect(response).toStrictEqual([[data], metadata]);
    });
  });

  describe('store', () => {
    it('it should return the created payable', async () => {
      const id = '123';
      const data = {
        value: 123123,
        emissionDate: `${new Date().toISOString()}`,
        assignor_id: '1231321',
        assignor: 'asdasd',
      };

      jest
        .spyOn(prismaService.payable, 'create')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, ...data }));

      const response = await payableService.store(data);

      expect(response).toStrictEqual({ id, ...data });
    });
  });

  describe('update', () => {
    it('it should return the updated payable', async () => {
      const id = '123';
      const data = {
        value: 123123,
        emissionDate: `${new Date().toISOString()}`,
        assignor_id: '1231321',
      };

      jest
        .spyOn(prismaService.payable, 'update')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, ...data }));

      const response = await payableService.update(id, data);

      expect(response).toStrictEqual({ id, ...data });
    });
  });

  describe('update', () => {
    it('it should return the deleted payable', async () => {
      const id = '123';
      const data = {
        value: 123123,
        emissionDate: new Date(),
        assignor_id: '1231321',
      };

      jest
        .spyOn(prismaService.payable, 'delete')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, ...data }));

      const response = await payableService.delete(id);

      expect(response).toStrictEqual({ id, ...data });
    });
  });
});
