import { PayableDto } from '../../payable/dto/create-payable';

export class AssignorDto {
  readonly document: string;
  readonly email: string;
  readonly phone: string;
  readonly name: string;
  readonly payables?: PayableDto[] | []
}
