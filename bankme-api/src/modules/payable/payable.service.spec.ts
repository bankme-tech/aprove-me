import { PayableService } from "./payable.service";
import prisma from "../../client";
import { newPayable, payable, result } from "../../../test/mocks/payable.mocks";

describe('PayableService', () => {

  let payableService: PayableService;

  beforeEach(() => {
    payableService = new PayableService();
  });

  describe('findAll', () => {
    it('Deve retornar um array de pagáveis', async () => {
      const findAllResult = [result];

      jest.spyOn(prisma.payable, 'findMany').mockResolvedValue(findAllResult);

      expect(await payableService.findAll()).toBe(findAllResult);
    });

    it('Deve retornar um array vazio quando não houver pagáveis', async () => {
      const result = [];

      jest.spyOn(prisma.payable, 'findMany').mockResolvedValue(result);

      expect(await payableService.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('Deve retornar um pagável', async () => {

      jest.spyOn(prisma.payable, 'findUnique').mockResolvedValue(result);

      expect(await payableService.findById('2a87ab92-8523-490e-b432-22ccee636149')).toBe(result);
    });
  });

  describe('create', () => {
    it('Deve criar e retornar o pagável criado', async () => {

      jest.spyOn(prisma.payable, 'create').mockResolvedValue(result);

      expect(await payableService.createPayable(payable)).toBe(result);
    });
  });

  describe('edit', () => {
    it('Deve editar e retornar o pagável editado', async () => {

      jest.spyOn(prisma.payable, 'update').mockResolvedValue(result);

      expect(await payableService.edit('2a87ab92-8523-490e-b432-22ccee636149', newPayable)).toBe(result);
    });
  });

  describe('delete', () => {
    it('Deve deletar e retornar o pagável deletado', async () => {

      jest.spyOn(prisma.payable, 'delete').mockResolvedValue(result);

      expect(await payableService.delete('2a87ab92-8523-490e-b432-22ccee636149')).toBe(result);
    });
  });
});
