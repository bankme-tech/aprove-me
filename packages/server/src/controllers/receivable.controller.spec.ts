/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from 'src/services/assignor.service';
// import { throw_error } from 'src/shared/utils';

describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  const mockAssignorService = {
    get_assignor: jest.fn().mockImplementation((id: string) => {
      return { isError: () => false, value: { id, name: 'Test Assignor' } };
    }),
    get_list_assignor: jest.fn().mockImplementation(() => {
      return {
        isError: () => false,
        value: [
          { id: '1', name: 'Test Assignor 1' },
          { id: '2', name: 'Test Assignor 2' },
        ],
      };
    }),
    delete_assignor: jest.fn().mockImplementation((id: string) => {
      return { isError: () => false, value: { id, deleted: true } };
    }),
    update_assignor: jest.fn().mockImplementation((id: string, assignor: any) => {
      return { isError: () => false, value: { id, ...assignor } };
    }),
    create_assignor: jest.fn().mockImplementation((assignor: any) => {
      return { isError: () => false, value: { id: 'new-id', ...assignor } };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: mockAssignorService,
        },
      ],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get an assignor', async () => {
    const result = await controller.get_Assignor('1');
    expect(result).toEqual({ id: '1', name: 'Test Assignor' });
  });

  it('should get a list of assignors', async () => {
    const result = await controller.get_list_Assignor();
    expect(result).toEqual([
      { id: '1', name: 'Test Assignor 1' },
      { id: '2', name: 'Test Assignor 2' },
    ]);
  });

  it('should delete an assignor', async () => {
    const result = await controller.delete_Assignor('1');
    expect(result).toEqual({ id: '1', deleted: true });
  });

  it('should update an assignor', async () => {
    const assignorData = { name: 'Updated Assignor' };
    const result = await controller.update_Assignor('1', assignorData);
    expect(result).toEqual({ id: '1', name: 'Updated Assignor' });
  });

  it('should create an assignor', async () => {
    const assignorData = { name: 'New Assignor' };
    const result = await controller.create_Assignor(assignorData);
    expect(result).toEqual({ id: 'new-id', name: 'New Assignor' });
  });
});
