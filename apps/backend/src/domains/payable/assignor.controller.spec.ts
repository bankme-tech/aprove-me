import { Test } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('PayableController', () => {
  let payableController: PayableController;
  let payableService: PayableService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService, PrismaService, JwtService],
    }).compile();

    payableService = moduleRef.get<PayableService>(PayableService);
    payableController = moduleRef.get<PayableController>(PayableController);
  });

  describe('index', () => {
    it('it should return the payable paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 0, total: 0 };

      jest
        .spyOn(payableService, 'index')
        .mockImplementation(async () => [[], metadata]);

      const response = await payableController.index({});

      expect(response).toStrictEqual({
        data: [],
        ...metadata,
      });
    });

    it('it should update the current page in the payable paginable response', async () => {
      const metadata = { limit: 25, page: 1, pages: 0, total: 0 };

      jest
        .spyOn(payableService, 'index')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation(async ({ q: _, ...data }) => [
          [],
          { ...metadata, ...data },
        ]);

      const response = await payableController.index({ page: 2 });

      expect(response).toStrictEqual({
        data: [],
        ...metadata,
        page: 2,
      });
    });
  });

  describe('store', () => {
    it('it should create and return the payable', async () => {
      const id = '123';
      const date = new Date(123123);
      const data = {
        value: 123123,
        emissionDate: `${date.toISOString()}`,
        assignor_id: '1231321',
      };

      // @ts-expect-error date shenanigans
      jest.spyOn(payableService, 'store').mockImplementation(async () => ({
        id,
        ...data,
      }));

      const response = await payableController.store(data);

      expect(response).toStrictEqual({ data: { id, ...data } });
    });
  });

  describe('show', () => {
    it('it should return the payable', async () => {
      const data = {
        id: '123',
        value: 123123,
        emissionDate: new Date(),
        assignor_id: '1231321',
      };

      jest.spyOn(payableService, 'show').mockImplementation(async () => data);

      const response = await payableController.show({ id: data.id });

      expect(response).toStrictEqual({ data });
    });

    it('it should throw if not found the payable', async () => {
      // @ts-expect-error Prisma is not showing nullables properly
      jest.spyOn(payableService, 'show').mockImplementation(async () => {});

      await expect(() =>
        payableController.show({ id: '123' }),
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('it should update and return the payable', async () => {
      const id = '123';
      const data = {
        value: 123123,
        emissionDate: new Date(),
        assignor_id: '1231321',
      };

      jest
        .spyOn(payableService, 'update')
        .mockImplementation(async () => ({ id, ...data }));

      const response = await payableController.update(
        { id },
        { ...data, emissionDate: '15/05/2020' },
      );

      expect(response).toStrictEqual({ data: { id, ...data } });
    });

    it('it should throw if not found the payable', async () => {
      // @ts-expect-error Prisma is not showing nullables properly
      jest.spyOn(payableService, 'update').mockImplementation(async () => {});

      await expect(() =>
        payableController.update({ id: '123' }, {}),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('it should delete and return the payable', async () => {
      const id = '123';
      const data = {
        value: 123123,
        emissionDate: new Date(),
        assignor_id: '1231321',
      };

      jest
        .spyOn(payableService, 'delete')
        .mockImplementation(async () => ({ id, ...data }));

      const response = await payableController.delete({ id });

      expect(response).toStrictEqual({ data: { id, ...data } });
    });

    it('it should throw if not found the payable', async () => {
      // @ts-expect-error Prisma is not showing nullables properly
      jest.spyOn(payableService, 'delete').mockImplementation(async () => {});

      await expect(() =>
        payableController.delete({ id: '123' }),
      ).rejects.toThrow();
    });
  });
});
