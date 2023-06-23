import { Injectable } from '@nestjs/common';
import { AssignorService } from '../assignor/assignor.service';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';

@Injectable()
export class AuthService {

  constructor (
    private readonly assignorService: AssignorService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const assignor = await this.assignorService.findOneByEmail({ email });

    const isPasswordMatching = await this.bcryptAdapter.compare(
      password,
      assignor.password,
    );

    if (!isPasswordMatching) return null;
  
    const { password: assignorPassword, ...result } = assignor;
    return result;
  }
}
