import { InputAssignorDTO } from 'src/assignor/dto/input-assignor.dto';
import { InputPayableDTO } from './input-payable.dto';

export type OutputPayableDTO = {
  payable: InputPayableDTO;
  assignor: InputAssignorDTO;
};
