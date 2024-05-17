import { AssignorController } from "./assignor.controller";
import { AssignorService } from "./assignor.service";
import { assignor, newAssignor, result } from "../../../test/mocks/assignor.mocks"

describe('AssignorController', () => {

  let assignorService: AssignorService;
  let assignorController: AssignorController;

  beforeEach(() => {
    assignorService = new AssignorService()
    assignorController = new AssignorController(assignorService);
  });
  
  describe('findAll', () => {
    it('Deve retornar um array de cedentes', async () => {
      const findAllResult = [result];

      jest.spyOn(assignorService, 'findAll').mockImplementation(async () => findAllResult);

      expect(await assignorController.findAll()).toBe(findAllResult);
    });

    it('Deve retornar um array vazio quando não houver cedentes', async () => {
      const result = [];

      jest.spyOn(assignorService, 'findAll').mockImplementation(async () => result);

      expect(await assignorController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um cedente', async () => {
      
      jest.spyOn(assignorService, 'findById').mockImplementation(async () => result);

      expect(await assignorController.findOne({id: 1})).toBe(result);
    });
  });

  describe('create', () => {
    it('Deve criar e retornar o cedente criado com seu ID', async () => {

      jest.spyOn(assignorService, 'createAssignor').mockImplementation(async () => result);

      expect(await assignorController.create(assignor)).toBe(result);

    });
  });

  describe('edit', () => {
    it('Deve editar e retornar o cedente editado', async () => {

      jest.spyOn(assignorService, 'edit').mockImplementation(async () => result);

      expect(await assignorController.edit({id: 1}, newAssignor)).toBe(result);
    });
  });

  describe('delete', () => {
    it('Deve deletar e retornar o cedente deletado', async () => {

      jest.spyOn(assignorService, 'delete').mockImplementation(async () => result);

      expect(await assignorController.delete({id: 1})).toBe(result);
    });
  });
});
