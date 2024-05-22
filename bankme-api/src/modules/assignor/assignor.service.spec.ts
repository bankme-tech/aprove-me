import { AssignorService } from "./assignor.service";
import prisma from '../../client';
import { EditAssignorDto } from "./dto/editAssignor.dto";
import { assignor, newAssignor, result } from "../../../test/mocks/assignor.mocks"
import { HttpException, HttpStatus } from "@nestjs/common";

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
    it('Deve retornar um array vazio quando não houver cedentes', async () => {
      const result = [];

      jest.spyOn(prisma.assignor, 'findMany').mockResolvedValue(result);

      expect(await assignorService.findAll()).toBe(result);
    }); 
  });

  describe('findById', () => {
    it('Deve retornar um cedente', async () => {

      jest.spyOn(prisma.assignor, 'findUnique').mockResolvedValue(result);

      expect(await assignorService.findById(1)).toBe(result);
    });
    it('Retorna um erro caso o cedente não exista', async () => {

      jest.spyOn(prisma.assignor, 'findUnique').mockResolvedValue(null);

      await expect(assignorService.findById(88)).rejects.toThrow(HttpException);
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

      jest.spyOn(assignorService, 'findById').mockResolvedValue(result);
      jest.spyOn(prisma.assignor, 'update').mockResolvedValue(result);

      expect(await assignorService.edit(1, newAssignor)).toBe(result);
    });

    it('Retorna um erro caso o cedente não exista', async () => {

      jest.spyOn(prisma.assignor, 'delete').mockResolvedValue(null);

      await expect(assignorService.edit(88, newAssignor)).rejects.toThrow(HttpException);
    });
  });

  describe('delete', () => {
    it('Deve deletar e retornar o cedente deletado', async () => {

      jest.spyOn(assignorService, 'findById').mockResolvedValue(result);
      jest.spyOn(prisma.assignor, 'delete').mockResolvedValue(result);

      expect(await assignorService.delete(1)).toBe(result);
    });
    it('Retorna um erro caso o cedente não exista', async () => {

      jest.spyOn(prisma.assignor, 'delete').mockResolvedValue(null);

      await expect(assignorService.delete(88)).rejects.toThrow(HttpException);
    });
  });
});
