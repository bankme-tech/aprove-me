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
            create: jest.fn().mockResolvedValue(makeFakePayable())
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
});
 