import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/user.dto';

@Injectable()
export class Authservice {
  login(dto: LoginDto) {
    return dto;
  }
}
