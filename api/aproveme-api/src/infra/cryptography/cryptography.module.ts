import { Module } from "@nestjs/common";

import { JwtEncrypter } from "./jwt-encrypter";
import { BcryptHasher } from "./bcrypt-hasher";

import { Encrypter } from "@/domain/account/application/cryptography/encrypter";
import { HashComparer } from "@/domain/account/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/account/application/cryptography/hash-generator";

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
