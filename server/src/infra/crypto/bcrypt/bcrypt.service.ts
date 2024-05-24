import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { HashGenerator } from '../shared/hash/hash-generator';

@Injectable()
export class BCryptService implements HashGenerator {
  private readonly logger = new Logger(BCryptService.name);

  constructor(private configService: ConfigService) {}

  async hash(plain: string): Promise<string> {
    const salt = this.configService.get<string>('BCRYPT_SALT');

    if (!salt) {
      this.logger.error('No salt provided on .env');

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await bcrypt.hash(plain, Number(salt));
  }

  async matches(hashed: string, plain: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
