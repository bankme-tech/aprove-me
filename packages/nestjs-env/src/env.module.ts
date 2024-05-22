import {
  DynamicModule,
  InternalServerErrorException,
  Module,
  Type,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvService } from './env.service';

/**
 * Type that represent the object that should be passed when setting up
 * the environment.
 */
export type IEnvModuleOptions = Omit<ConfigModuleOptions, 'isGlobal'>;

@Module({})
export class EnvModule {
  private static readonly _configs: Type<unknown>[] = [];

  static forChild(configs: Type<unknown>[]): DynamicModule {
    EnvModule._configs.push(...configs);

    return {
      global: true,
      module: EnvModule,
    };
  }

  static forRoot(options?: IEnvModuleOptions): DynamicModule {
    return {
      global: true,
      module: EnvModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          validate: EnvModule.validate,
        }),
      ],
      providers: [EnvService],
      exports: [EnvService],
    };
  }

  /**
   * Method that validates all the environment variables before the
   * application starts.
   *
   * @param config defines the variables and it values.
   * @returns an object that represents the variables and it values.
   */
  private static validate(config: Record<string, any>): IEnv {
    let res = config;
    for (const classRef of EnvModule._configs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validatedConfig: any = plainToClass(classRef, config, {
        enableImplicitConversion: true,
      });
      const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
      });
      if (errors.length) {
        const errorSentence = `Invalid environment variables\n- ${errors
          .map((error) => error.constraints)
          .map((constraint) => Object.values(constraint!))
          .flat()
          .join('.\n- ')}`;
        Logger.error(errorSentence, 'EnvModule');
        throw new InternalServerErrorException(errorSentence);
      }
      res = { ...res, ...validatedConfig };
    }
    return res as IEnv;
  }
}
