import { Injectable } from '@nestjs/common';
import { AssignorService } from '../assignor/assignor.service';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (
    private readonly assignorService: AssignorService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const assignor = await this.assignorService.findOneByUsername({ username });

    if(!assignor) return null

    const isPasswordMatching = await this.bcryptAdapter.compare(
      password,
      assignor.password,
    );

    if (!isPasswordMatching) return null;
  
    const { password: assignorPassword, ...result } = assignor;
    return result;
  }

  async login (user) {
    const payload = {
      sub: user.id,
      email: user.email
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token,
    };
  }
}
