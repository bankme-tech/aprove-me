import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

const makeFakeAssignor = () => ({
  id: 'any_id',
  document: 'any_document',
  email: 'any_email',
  phone: 'any_phone',
  name: 'any_name',
  username: 'any_username',
})

describe('AssignorController', () => {
  let sut: AssignorController;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: {
            create: jest.fn().mockResolvedValue(makeFakeAssignor()),
            findOne: jest.fn().mockResolvedValue(makeFakeAssignor()),
            findAll: jest.fn().mockResolvedValue([makeFakeAssignor(), makeFakeAssignor()]),
            update: jest.fn().mockResolvedValue(makeFakeAssignor()),
            remove: jest.fn()
          }
        }
      ],
    }).compile();

    sut = module.get<AssignorController>(AssignorController);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should call service with correct values', async () => {
      const createSpy = jest.spyOn(assignorService, 'create')

      await sut.create({
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
        username: 'any_username',
        password: 'any_password'
      })

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          document: 'any_document',
          email: 'any_email',
          phone: 'any_phone',
          name: 'any_name',
          username: 'any_username',
          password: 'any_password'
        }
      })
    });

    it('should return a assignor on success', async () => {
      const response = await sut.create({
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
        username: 'any_username',
        password: 'any_password'
      })

      expect(response).toEqual({
        id: 'any_id',
        document: 'any_document',
        email: 'any_email',
        phone: 'any_phone',
        name: 'any_name',
        username: 'any_username',
      })
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorService, 'findOne')
      await sut.findOne('any_id')
      expect(findOneSpy).toHaveBeenCalledWith({
        id: 'any_id'
      })
    });

    it('should return a assignor entity on success', async () => {
      const response = await sut.findOne('any_id')
      expect(response).toEqual(makeFakeAssignor())
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with correct values', async () => {
      const findAllSpy = jest.spyOn(assignorService, 'findAll')

      await sut.findAll({
        email: 'any_email',
        name: 'any_name',
        page: '3',
        itemsPerPage: '15'
      })

      expect(findAllSpy).toHaveBeenCalledWith({
        filters: {
          email: 'any_email',
          name: 'any_name',
        },
        page: 3,
        itemsPerPage: 15,
      })
    });

    it('should call service.findAll with correct values and default values', async () => {
      const findAllSpy = jest.spyOn(assignorService, 'findAll')

      await sut.findAll({})

      expect(findAllSpy).toHaveBeenCalledWith({
        filters: {
          email: undefined,
          name: undefined,
        },
        page: 1,
        itemsPerPage: 10,
      })
    });

    it('should return a list of entities on success', async () => {
      const response = await sut.findAll({
        email: 'any_email',
        name: 'any_name',
        page: '3',
        itemsPerPage: '15'
      })

      expect(response).toEqual([makeFakeAssignor(), makeFakeAssignor()])
    });
  });

  describe('update', () => {
    it('should call service.udpate with correct values', async () => {
      const updateSpy = jest.spyOn(assignorService, 'update')
      await sut.update('any_id', {name: 'any_new_name', phone: 'any_new_phone'})
      expect(updateSpy).toHaveBeenCalledWith({ id: 'any_id', data: { name: 'any_new_name', phone: 'any_new_phone' }})
    });

    it('should return a entity on success', async () => {
      const response = await sut.update('any_id', {name: 'any_new_name'})
      expect(response).toEqual(makeFakeAssignor())
    });
  });

  describe('remove', () => {
    it('should call service.delete with correct values', async () => {
      const removeSpy = jest.spyOn(assignorService, 'remove')
      await sut.remove('any_id')
      expect(removeSpy).toHaveBeenCalledWith({ id: 'any_id' })
    });

    it('should return a entity on success', async () => {
      const response = await sut.remove('any_id')
      expect(response).toEqual({
        message: 'Assignor deleted with success'
      })
    });
  });
});
 