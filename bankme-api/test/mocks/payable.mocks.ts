import { EditPayableDto } from "src/modules/payable/dto/editPayable.dto";

export const result = {
  id: '2a87ab92-8523-490e-b432-22ccee636149',
  value: 10,
  emissionDate: new Date('2024-02-27T00:00:00.000Z'),
  assignorId: 2,
};

export const payable = {
  value: 1200,
  emissionDate: new Date('2024-02-27T00:00:00.000Z'), 
  assignorId: 2
};

export const newPayable = {
  value: 10,
} as EditPayableDto;