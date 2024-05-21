import { Injectable } from '@nestjs/common';
import { assignorBodyDto } from 'src/dtos/assignor.dto';
import { receivableBodyDto } from 'src/dtos/receivable.dto';
import { AssignorRepository } from 'src/repositories/assignor.repository';
import { ReceivableRepository } from 'src/repositories/receivable.repository';
import { assignorSchema, updateAssignorSchema } from 'src/validations/assignor.schema';
import { receivableSchema, updateReceivableSchema } from 'src/validations/receivable.schema';
import { z } from 'zod';

@Injectable()
export class ValidationService {
  validateAssignor(data: assignorBodyDto) {
    return assignorSchema.parse(data) as unknown as assignorBodyDto;
  }
  validateReceivable(data: receivableBodyDto): receivableBodyDto {
    return receivableSchema.parse(data) as unknown as receivableBodyDto;
  }
  validateUpdateReceivable(data: ReceivableRepository.bodyType) {
    return updateReceivableSchema.parse(data);
  }
  validateUpdateAssignor(data: AssignorRepository.bodyType) {
    return updateAssignorSchema.parse(data);
  }

  validateUuid(data: string) {
    return z
      .string()
      .uuid({
        message: 'Invalid Id',
      })
      .parse(data);
  }
}
