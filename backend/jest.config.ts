import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@core/(.+)': '<rootDir>/src/core/$1',
    '@config/(.+)': '<rootDir>/src/config/$1',
    '@infra/(.+)': '<rootDir>/src/infra/$1',
  },
  modulePathIgnorePatterns: ['.*\\.module\\.ts$', '<rootDir>/src/config'],
};

export default config;
