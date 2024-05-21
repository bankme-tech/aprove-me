import { payable } from '../examples/payable-examples';

export const payableRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(payable.payable1),
  findAll: jest.fn().mockResolvedValue([payable.payable1, payable.payable2]),
  create: jest.fn().mockResolvedValue(payable.payable1),
  update: jest.fn().mockResolvedValue(payable.payable1),
  delete: jest.fn().mockResolvedValue(undefined),
};
