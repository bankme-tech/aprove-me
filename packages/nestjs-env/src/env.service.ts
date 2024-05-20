import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Class that represents the service that deals with the environment
 * variables.
 */
@Injectable()
export class EnvService {
  constructor(private readonly _configService: ConfigService) {}

  /**
   * Method that gets some environment variable value based on the `key`.
   *
   * @param key defines the variable key.
   * @returns the variable value.
   */
  get<T extends keyof IEnv>(key: T): IEnv[T] {
    return this._configService.get<IEnv[T]>(key)!;
  }
}
