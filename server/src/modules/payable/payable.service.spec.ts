import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PayableRepository } from '../../data/repositories/payable-repository/payable-repository';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { UnauthorizedException } from '@nestjs/common';

const makeFakePayable = () => ({
  id: 'any_id',
  assignorId: 'any_assignor_id',
  emissionDate: 'any_emission_date',
  valueInCents: 10000
})

describe('PayableService', () => {
  let sut: PayableService;
  let payableRepository: PayableRepository;
  let assignorRepository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService, 
        {
          provide: PayableRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(makeFakePayable()),
            findOne: jest.fn().mockResolvedValue(makeFakePayable()),
            findAll: jest.fn().mockResolvedValue([makeFakePayable(), makeFakePayable()]),
            update: jest.fn().mockResolvedValue(makeFakePayable()),
            remove: jest.fn()
          }
        },
        {
          provide: AssignorRepository,
          useValue: { 
            findOne: jest.fn().mockResolvedValue({id: 'any_id'}) 
          }
        }
      ],
    }).compile();

    sut = module.get<PayableService>(PayableService);
    payableRepository = module.get<PayableRepository>(PayableRepository);
    assignorRepository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(assignorRepository, 'findOne')

      await sut.create({
        data: {
          assignorId: 'any_assignor_id',
          emissionDate: 'any_emission_date',
          valueInCents: 10000
        }
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_assignor_id'
        }
      })
    });

    it('should throw if assignor not exists', async () => {
      jest.spyOn(assignorRepository, 'findOne').mockResolvedValueOnce(null)

      const promise = sut.create({
        data: {
          assignorId: 'any_assignor_id',
          emissionDate: 'any_emission_date',
          valueInCents: 10000
        }
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Assignor does not exist '))
    });

    it('should call repository.create with correct values', async () => {
      const createSpy = jest.spyOn(payableRepository, 'create')

      await sut.create({
        data: {
          assignorId: 'any_assignor_id',
          emissionDate: 'any_emission_date',
          valueInCents: 10000
        }
      })

      expect(createSpy).toHaveBeenCalledWith({
        assignorId: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })
    });

    it('should return a payable entity on success', async () => {
      const result = await sut.create({
        data: {
          assignorId: 'any_assignor_id',
          emissionDate: 'any_emission_date',
          valueInCents: 10000
        }
      })

      expect(result).toEqual(makeFakePayable())
    });
  });

  describe('findOne', () => {
    it('should call repository with correct values', async () => {
      const findOneSpy = jest.spyOn(payableRepository, 'findOne')
      await sut.findOne({id: 'any_id'})
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id'
        }
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.findOne({id: 'any_id'})
      expect(result).toEqual(makeFakePayable())
    });
  });

  describe('findAll', () => {
    it('should call repository with correct values', async () => {
      const findAllSpy = jest.spyOn(payableRepository, 'findAll')
      await sut.findAll({filters: {}, page: 1, itemsPerPage: 10})
      expect(findAllSpy).toHaveBeenCalledWith({
        where: {},
        take: 10,
        skip: 0
      })
    });

    it('should call repository with correct values and filters', async () => {
      const findAllSpy = jest.spyOn(payableRepository, 'findAll')
      await sut.findAll({filters: {assignorId: 'any_assignor_id'}, page: 3, itemsPerPage: 10})
      expect(findAllSpy).toHaveBeenCalledWith({
        where: {assignorId: 'any_assignor_id'},
        take: 10,
        skip: 20
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.findAll({filters: {}, page: 1, itemsPerPage: 10})
      expect(result).toEqual([makeFakePayable(), makeFakePayable()])
    });
  });

  describe('update', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(payableRepository, 'findOne')

      await sut.update({
        id: 'any_id',
        data: {
          valueInCents: 10000
        }
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id',
        }
      })
    });

    it('should throw if payable already exists', async () => {
      jest.spyOn(payableRepository, 'findOne').mockResolvedValueOnce(null)

      const promise = sut.update({
        id: 'any_id',
        data: {
          valueInCents: 10000
        }
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Payable not found'))
    });

    it('should call repository with correct values', async () => {
      const updateSpy = jest.spyOn(payableRepository, 'update')
      await sut.update({
        id: 'any_id',
        data: {
          valueInCents: 10000
        }
      })
      expect(updateSpy).toHaveBeenCalledWith('any_id',{
        valueInCents: 10000
      })
    });

    it('should return a entity on success', async () => {
      const result = await sut.update({
        id: 'any_id',
        data: {
          valueInCents: 10000
        }
      })
      expect(result).toEqual(makeFakePayable())
    });
  });

  describe('remove', () => {
    it('should call repository.findOne with correct values', async () => {
      const findOneSpy = jest.spyOn(payableRepository, 'findOne')

      await sut.remove({
        id: 'any_id'
      })

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 'any_id',
        }
      })
    });

    it('should throw if payable already exists', async () => {
      jest.spyOn(payableRepository, 'findOne').mockResolvedValueOnce(null)

      const promise = sut.remove({
        id: 'any_id'
      })

      await expect(promise).rejects.toThrowError(new UnauthorizedException('Payable not found'))
    });

    it('should call repository with correct values', async () => {
      const removeSpy = jest.spyOn(payableRepository, 'remove')
      await sut.remove({
        id: 'any_id'
      })
      expect(removeSpy).toHaveBeenCalledWith('any_id')
    });
  });
});
 