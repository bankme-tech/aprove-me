import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

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
            create: jest.fn().mockResolvedValue({
              id: 'any_id',
              assignor: 'any_assignor_id',
              emissionDate: 'any_emission_date',
              valueInCents: 10000
            })
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
        assignor: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          assignor: 'any_assignor_id',
          emissionDate: 'any_emission_date',
          valueInCents: 10000
        }
      })

    });

    it('should return a payable entity on success', async () => {
      const response = await sut.create({
        assignor: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })

      expect(response).toEqual({
        id: 'any_id',
        assignor: 'any_assignor_id',
        emissionDate: 'any_emission_date',
        valueInCents: 10000
      })
    });
  });
});
