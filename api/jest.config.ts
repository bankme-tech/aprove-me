import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  testRegex: '.*spec\\.ts$',

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/config/**/*.ts',
    '!src/**/interfaces/**/*.ts',
    '!src/infra/**/*.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text-summary', 'lcov'],

  testEnvironment: 'node',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
