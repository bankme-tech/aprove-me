import { PayableController } from "./payable.controller";
import { PayableService } from "./payable.service";
import { newPayable, payable, result } from "../../../test/mocks/payable.mocks";

describe('PayableController', () => {

  let payableController: PayableController;
  let payableService: PayableService;

  beforeEach(() => {
    payableService = new PayableService()
    payableController = new PayableController(payableService);
  });
  
  describe('findAll', () => {
    it('Deve retornar um array de pagáveis', async () => {
      const findAllResult = [result];

      jest.spyOn(payableService, 'findAll').mockImplementation(async () => findAllResult);

      expect(await payableController.findAll()).toBe(findAllResult);
    });

    it('Deve retornar um array vazio quando não houver pagáveis', async () => {
      const result = [];

      jest.spyOn(payableService, 'findAll').mockImplementation(async () => result);

      expect(await payableController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um pagável', async () => {

      jest.spyOn(payableService, 'findById').mockImplementation(async () => result);

      expect(await payableController.findOne({id: 1})).toBe(result);
    });
  });

  describe('create', () => {
    it('Deve criar e retornar o pagável criado', async () => {

      jest.spyOn(payableService, 'createPayable').mockImplementation(async () => result);

      expect(await payableController.create(payable)).toBe(result);
    });
  });

  describe('edit', () => {
    it('Deve editar e retornar o pagável editado', async () => {

      jest.spyOn(payableService, 'edit').mockImplementation(async () => result);

      expect(await payableController.edit({id: '2a87ab92-8523-490e-b432-22ccee636149'}, newPayable)).toBe(result);
    });
  });

  describe('delete', () => {
    it('Deve deletar e retornar o pagável deletado', async () => {

      jest.spyOn(payableService, 'delete').mockImplementation(async () => result);

      expect(await payableController.delete({id: 1})).toBe(result);
    });
  });
});
