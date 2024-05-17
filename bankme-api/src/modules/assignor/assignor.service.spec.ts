import { AssignorService } from "./assignor.service";
import prisma from '../../client';
import { EditAssignorDto } from "./dto/editAssignor.dto";
import { assignor, newAssignor, result } from "../../../test/mocks/assignor.mocks"

describe('AssignorService', () => {

  let assignorService: AssignorService;

  beforeEach(() => {
    assignorService = new AssignorService();
  });

  describe('findAll', () => {
    it('Deve retornar um array de cedentes', async () => {
      const findAllResult = [result];
      
      jest.spyOn(prisma.assignor, 'findMany').mockResolvedValue(findAllResult);

      expect(await assignorService.findAll()).toBe(findAllResult);
    }); 
  });

  describe('findById', () => {
    it('Deve retornar um cedente', async () => {

      jest.spyOn(prisma.assignor, 'findUnique').mockResolvedValue(result);

      expect(await assignorService.findById(1)).toBe(result);
    });
  });

  describe('createAssignor', () => {
    it('Cria e retorna um cedente', async () => {

      jest.spyOn(prisma.assignor, 'create').mockResolvedValue(result);

      expect(await assignorService.createAssignor(assignor)).toBe(result);
    });
  });

  describe('edit', () => {
    it('Edita e retorna o cedente editado', async () => {

      jest.spyOn(prisma.assignor, 'update').mockResolvedValue(result);

      expect(await assignorService.edit(1, newAssignor)).toBe(result);
    });
  });

  describe('delete', () => {
    it('Deve deletar e retornar o cedente deletado', async () => {

      jest.spyOn(prisma.assignor, 'delete').mockResolvedValue(result);

      expect(await assignorService.delete(1)).toBe(result);
    });
  });
});