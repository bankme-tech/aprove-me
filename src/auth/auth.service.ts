import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    return dto;
  }
}
