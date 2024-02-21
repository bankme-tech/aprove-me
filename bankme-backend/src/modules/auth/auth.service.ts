import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginBodyDTO } from './dtos/loginBodyDTO';
import * as bcrypt from 'bcryptjs';
import { RegisterBodyDTO } from './dtos/registerBodyDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(data: LoginBodyDTO) {
    const { email, password } = data;

    const user = await this.userService.findByEmail({ email });
    if (!user) throw new BadRequestException('Email or password incorrect');

    const correctPassword = bcrypt.compareSync(password, user.password);

    if (!correctPassword) {
      throw new BadRequestException('Email or password incorrect');
    }

    const payload = { email: user.email }

    return {
      access_token: this.jwtService.sign(payload),
      message: 'User logged in successfully',
    };
  }

  async register(data: RegisterBodyDTO) {
    const { email, name, password } = data;

    const userExist = await this.userService.findByEmail({ email });

    if (userExist) throw new ConflictException();

    const user = await this.userService.create({ email, name, password });

    const payload = { id: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: 'Successfully registered',
    };
  }
}
