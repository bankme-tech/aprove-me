import { Assignor } from '../entities/assignor.entity';
import { IsString, IsUUID, MaxLength } from 'class-validator';
import { UUID } from 'crypto';

export class InputAssignorDTO extends Assignor {
  @IsUUID('all', { message: 'id must be a valid UUID' })
  public id: UUID;

  @MaxLength(30, {
    message: 'Document must be less than or equal to 30 characters',
  })
  @IsString({ message: 'Document must be a string' })
  public document: string;

  @MaxLength(140, {
    message: 'Email must be less than or equal to 140 characters',
  })
  @IsString({ message: 'Email must be a string' })
  public email: string;

  @MaxLength(20, {
    message: 'Phone must be less than or equal to 20 characters',
  })
  @IsString({ message: 'Phone must be a string' })
  public phone: string;

  @MaxLength(140, {
    message: 'Name must be less than or equal to 140 characters',
  })
  @IsString({ message: 'Name must be a string' })
  public name: string;
}
