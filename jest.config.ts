export default {
  bail: 1,
  clearMocks: true,
  detectOpenHandles: true,
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**', '!<rootDir>/src/domain/common/exception/*'],
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
