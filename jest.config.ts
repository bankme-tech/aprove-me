export default {
  bail: 1,
  clearMocks: true,
  detectOpenHandles: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/domain/common/exception/*',
    '!<rootDir>/src/domain/repository/*',
    '!<rootDir>/src/infra/repository/*'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  roots: ['<rootDir>/test', '<rootDir>/src'],
  preset: 'ts-jest',
  transform: { '.+\\.ts$': 'ts-jest' },
  watchPathIgnorePatterns: ['globalConfig'],
  setupFiles: ['<rootDir>/.jest/setup.ts'],
  testEnvironmentOptions: {
    timeZone: 'America/Sao_Paulo',
  },
};
