import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

const makeFakePayable = () => ({
  id: 'any_id',
  assignorId: 'any_assignor_id',
  emissionDate: 'any_emission_date', 
  valueInCents: 10000
})

describe('PayableController', () => {
  let sut: PayableController;
  let payableService: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: PayableService,
          useValue: {
            create: jest.fn().mockResolvedValue(makeFakePayable()),
            findOne: jest.fn().mockResolvedValue(makeFakePayable()),
            findAll: jest.fn().mockResolvedValue([makeFakePayable(), makeFakePayable()]),
            update: jest.fn().mockResolvedValue(makeFakePayable()),
            remove: jest.fn()
          }
        }
      ],
    }).compile();

    sut = module.get<PayableController>(PayableController);
    payableService = module.get<PayableService>(PayableService);
  }); 

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct values', async () => {

      const createSpy = jest.spyOn(payableService, 'create')

      await sut.create({
        assignorId: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          assignorId: 'any_assignor_id',
          emissionDate: 'any_emission_date',
          valueInCents: 10000
        }
      })

    });

    it('should return a payable entity on success', async () => {
      const response = await sut.create({
        assignorId: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })

      expect(response).toEqual({
        id: 'any_id',
        assignorId: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(payableService, 'findOne')
      await sut.findOne('any_id')
      expect(findOneSpy).toHaveBeenCalledWith({
        id: 'any_id'
      })
    });

    it('should return a assignor entity on success', async () => {
      const response = await sut.findOne('any_id')
      expect(response).toEqual(makeFakePayable())
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with correct values', async () => {
      const findAllSpy = jest.spyOn(payableService, 'findAll')

      await sut.findAll({
        assignorId: 'any_assignor_id',
        page: '3',
        itemsPerPage: '15'
      })

      expect(findAllSpy).toHaveBeenCalledWith({
        filters: {
          assignorId: 'any_assignor_id',
        },
        page: 3,
        itemsPerPage: 15,
      })
    });

    it('should call service.findAll with correct values and default values', async () => {
      const findAllSpy = jest.spyOn(payableService, 'findAll')

      await sut.findAll({})

      expect(findAllSpy).toHaveBeenCalledWith({
        filters: {
          assignorId: undefined,
        },
        page: 1,
        itemsPerPage: 10,
      })
    });

    it('should return a list of entities on success', async () => {
      const response = await sut.findAll({
        assignorId: 'any_assignor_id',
        page: '3',
        itemsPerPage: '15'
      })

      expect(response).toEqual([makeFakePayable(), makeFakePayable()])
    });
  });

  describe('update', () => {
    it('should call service.udpate with correct values', async () => {
      const updateSpy = jest.spyOn(payableService, 'update')
      await sut.update('any_id', { valueInCents: 100 })
      expect(updateSpy).toHaveBeenCalledWith({ id: 'any_id', data: { valueInCents: 100  }})
    });

    it('should return a entity on success', async () => {
      const response = await sut.update('any_id', { valueInCents: 100  })
      expect(response).toEqual(makeFakePayable())
    });
  });

  describe('remove', () => {
    it('should call service.delete with correct values', async () => {
      const removeSpy = jest.spyOn(payableService, 'remove')
      await sut.remove('any_id')
      expect(removeSpy).toHaveBeenCalledWith({ id: 'any_id' })
    });

    it('should return a entity on success', async () => {
      const response = await sut.remove('any_id')
      expect(response).toEqual({
        message: 'Payable deleted with success'
      })
    });
  });
});
