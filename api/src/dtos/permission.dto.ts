import { UUID } from 'crypto';
import { IsNotEmpty, IsString} from 'class-validator';

export class Permission {
    id: UUID
  
    @IsNotEmpty()
    @IsString()
    login: string
  
    @IsNotEmpty()
    @IsString()
    password: string
  }