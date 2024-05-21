import { ModuleMetadata } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { AuthGuard } from '~/modules/auth/guards/auth.guard';
import { HashProvider } from '../providers/hash.provider';

/**
 * Module to make easy import authenticate structure on tests
 */
export const FakeAuthModule: ModuleMetadata = {
  imports: [
    JwtModule.register({
      secret: randomUUID(),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthGuard, HashProvider],
};
