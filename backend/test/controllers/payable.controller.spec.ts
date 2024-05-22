import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from '../../src/payable/payable.controller';
import { InputPayableDTO } from '../../src/payable/dto/input-payable.dto';
import { InputAssignorDTO } from 'src/assignor/dto/input-assignor.dto';
import { makeAssignorDTO, makePayableDTO } from '../../test/mocks/dtos.mock';

describe('PayableController', () => {
  let sut: PayableController;
  let assignorDTO: InputAssignorDTO;
  let payableDTO: InputPayableDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [],
      imports: [],
    }).compile();

    sut = module.get<PayableController>(PayableController);

    assignorDTO = makeAssignorDTO();
    payableDTO = makePayableDTO();
  });

  describe('POST', () => {
    test('should return all data from Payable and Assignor', () => {
      const response = sut.display({
        payable: payableDTO,
        assignor: assignorDTO,
      });

      expect(response).toStrictEqual({
        payable: payableDTO,
        assignor: assignorDTO,
      });
    });
  });
});
