import { assignor } from '../examples/assignor-examples';

export const assignorRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(assignor.assignor1),
};
