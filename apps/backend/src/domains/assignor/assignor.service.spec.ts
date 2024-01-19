import { Test } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AssignorService', () => {
  let assignorService: AssignorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AssignorService, PrismaService, JwtService],
    }).compile();

    assignorService = moduleRef.get<AssignorService>(AssignorService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('index', () => {
    it('it should return the assignor empty paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 0, total: 0 };

      jest
        .spyOn(prismaService.assignor, 'findMany')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => []);
      jest
        .spyOn(prismaService.assignor, 'aggregate')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({
          _count: {
            id: 0,
          },
        }));

      const response = await assignorService.index(metadata);

      expect(response).toStrictEqual([[], metadata]);
    });

    it('it should return the assignor containing entries paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 1, total: 1 };
      const data = {
        id: '123123',
        document: '123213',
        email: 'psdad@dasd.acom',
        name: 'John Doe',
        phone: '123123213',
      };

      jest
        .spyOn(prismaService.assignor, 'findMany')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => [data]);
      jest
        .spyOn(prismaService.assignor, 'aggregate')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({
          _count: {
            id: 1,
          },
        }));

      const response = await assignorService.index(metadata);

      expect(response).toStrictEqual([[data], metadata]);
    });
  });

  describe('store', () => {
    it('it should return the created assignor', async () => {
      const id = '123';
      const data = {
        document: '123123',
        email: 'email@john.doe',
        phone: '1231321',
        name: 'John Doe',
      };

      jest
        .spyOn(prismaService.assignor, 'create')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, ...data }));

      const response = await assignorService.store(data);

      expect(response).toStrictEqual({ id, ...data });
    });
  });

  describe('update', () => {
    it('it should return the updated assignor', async () => {
      const id = '123';
      const data = {
        document: '123123',
        email: 'email@john.doe',
        phone: '1231321',
        name: 'John Doe',
      };

      jest
        .spyOn(prismaService.assignor, 'update')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, ...data }));

      const response = await assignorService.update(id, data);

      expect(response).toStrictEqual({ id, ...data });
    });
  });

  describe('update', () => {
    it('it should return the deleted assignor', async () => {
      const id = '123';
      const data = {
        document: '123123',
        email: 'email@john.doe',
        phone: '1231321',
        name: 'John Doe',
      };

      jest
        .spyOn(prismaService.assignor, 'delete')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, ...data }));

      const response = await assignorService.delete(id);

      expect(response).toStrictEqual({ id, ...data });
    });
  });
});
