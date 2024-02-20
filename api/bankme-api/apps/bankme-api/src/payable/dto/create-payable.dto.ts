import { ApiProperty } from '@nestjs/swagger';

export class CreatePayableAssignorDto {
  @ApiProperty()
  public document: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public phone: string;
  @ApiProperty()
  public name: string;
}

export class CreatePayableDto {
  @ApiProperty()
  public value: number;
  @ApiProperty()
  public emissionDate: Date;
  @ApiProperty()
  public assignorId: string;

  @ApiProperty()
  public assignor?: CreatePayableAssignorDto;
}
