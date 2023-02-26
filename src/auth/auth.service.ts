import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/user.dto';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    return dto;
  }
}
