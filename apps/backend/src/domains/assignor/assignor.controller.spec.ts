import { Test } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AssignorController', () => {
  let assignorController: AssignorController;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService, JwtService],
    }).compile();

    assignorService = moduleRef.get<AssignorService>(AssignorService);
    assignorController = moduleRef.get<AssignorController>(AssignorController);
  });

  describe('index', () => {
    it('it should return the assignor paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 0, total: 0 };

      jest
        .spyOn(assignorService, 'index')
        .mockImplementation(async () => [[], metadata]);

      const response = await assignorController.index({});

      expect(response).toStrictEqual({
        data: [],
        ...metadata,
      });
    });

    it('it should update the current page in the assignor paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 0, total: 0 };

      jest
        .spyOn(assignorService, 'index')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async ({ q: _, ...data }) => [
          [],
          { ...metadata, ...data },
        ]);

      const response = await assignorController.index({ page: 2 });

      expect(response).toStrictEqual({
        data: [],
        ...metadata,
        page: 2,
      });
    });
  });

  describe('store', () => {
    it('it should create and return the assignor', async () => {
      const id = '123';
      const data = {
        document: '123123',
        email: 'email@john.doe',
        phone: '1231321',
        name: 'John Doe',
      };

      jest
        .spyOn(assignorService, 'store')
        .mockImplementation(async () => ({ id, ...data }));

      const response = await assignorController.store(data);

      expect(response).toStrictEqual({ data: { id, ...data } });
    });
  });

  describe('show', () => {
    it('it should return the assignor', async () => {
      const data = {
        id: '123',
        document: '123123',
        email: 'email@john.doe',
        phone: '1231321',
        name: 'John Doe',
      };

      jest.spyOn(assignorService, 'show').mockImplementation(async () => data);

      const response = await assignorController.show({ id: data.id });

      expect(response).toStrictEqual({ data });
    });

    it('it should throw if not found the assignor', async () => {
      // @ts-expect-error Prisma is not showing nullables properly
      jest.spyOn(assignorService, 'show').mockImplementation(async () => {});

      await expect(() =>
        assignorController.show({ id: '123' }),
      ).rejects.toThrow();
    });
  });
});
