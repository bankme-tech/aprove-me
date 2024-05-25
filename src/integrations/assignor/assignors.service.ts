import { AssignorDto } from './dto/create.assignor';
import * as AssignorModel from '../assignor/model/assignorModel'
import { PayableDto } from '../payable/dto/create-payable';
import * as PayableModel from '../payable/model/payableModel';
import { deleteAssignor } from '../assignor/model/assignorModel';
export class AssignorService {

  async create(payable: AssignorDto): Promise<AssignorDto> {
    return  await AssignorModel.add(payable)
  }

  async findOne(id: string): Promise<AssignorDto> {
    return await AssignorModel.findOne(id)
  }

  async update(id, assignor: AssignorDto): Promise<AssignorDto> {
    return  await AssignorModel.update(id, assignor)
  }

  async delete(id: string): Promise<AssignorDto> {
    return await AssignorModel.deleteAssignor(id)
  }
}
