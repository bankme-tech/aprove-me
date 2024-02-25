import { mock, mockReset } from 'jest-mock-extended';
import { AssignorDomainService } from '../assignor-service';
import { IAssignorRepository } from '../interfaces/assignor-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepository } from 'bme/core/infra/database/repositories/assignor-repository';
import { AssignorMocks } from './assignor-mocks';

describe('AssignorDomainservice', () => {
  let service: AssignorDomainService;
  const assignorRepositoryMock = mock<IAssignorRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorDomainService,
        { provide: AssignorRepository, useValue: assignorRepositoryMock },
      ],
    }).compile();

    mockReset(assignorRepositoryMock);

    service = module.get<AssignorDomainService>(AssignorDomainService);
  });

  describe('AssignorDomainService.isValid()', () => {
    it('should be a invalid AssignorVO', async () => {
      const assignor = AssignorMocks.getAssignor();
      const vo = AssignorMocks.convertAssignorToVO(assignor);

      assignorRepositoryMock.documentExists
        .calledWith(assignor.document)
        .mockReturnValue(Promise.resolve(true));

      assignorRepositoryMock.emailExists
        .calledWith(assignor.email)
        .mockReturnValue(Promise.resolve(true));

      service.resetDomain();
      const result = await service.validate(vo);

      expect(service.getErrors().length).toBeGreaterThanOrEqual(1);
      expect(result).toStrictEqual(false);

      expect(assignorRepositoryMock.documentExists).toHaveBeenCalledWith(
        assignor.document,
      );
      expect(assignorRepositoryMock.emailExists).toHaveBeenCalledWith(
        assignor.email,
      );

      expect(assignorRepositoryMock.emailExists).toHaveBeenCalledTimes(1);
      expect(assignorRepositoryMock.documentExists).toHaveBeenCalledTimes(1);
    });

    it('should be a valid AssignorVO', async () => {
      const assignor = AssignorMocks.getAssignor();
      const vo = AssignorMocks.convertAssignorToVO(assignor);
      console.log(assignor.document);

      assignorRepositoryMock.documentExists
        .calledWith(assignor.document)
        .mockReturnValue(Promise.resolve(false));

      assignorRepositoryMock.emailExists
        .calledWith(assignor.email)
        .mockReturnValue(Promise.resolve(false));

      service.resetDomain();

      const result = await service.validate(vo);
      console.log(service.getErrors());

      expect(service.getErrors().length).toStrictEqual(0);
      expect(result).toStrictEqual(true);

      expect(assignorRepositoryMock.documentExists).toHaveBeenCalledWith(
        assignor.document,
      );
      expect(assignorRepositoryMock.emailExists).toHaveBeenCalledWith(
        assignor.email,
      );

      expect(assignorRepositoryMock.emailExists).toHaveBeenCalledTimes(1);
      expect(assignorRepositoryMock.documentExists).toHaveBeenCalledTimes(1);
    });
  });
});
