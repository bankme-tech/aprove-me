import { IsNumberString, IsOptional } from 'class-validator';

export interface Filters {
  id?: string | string[];
  name?: string | string[];
  email?: string | string[];
}

export class ListAssignorRequestDto {
  id?: string | string[];
  name?: string | string[];
  email?: string | string[];

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  itemsPerPage?: string;
}
