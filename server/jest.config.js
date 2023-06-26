module.exports = {
    rootDir: ".",
    roots: [
      '<rootDir>/src'
    ],
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    modulePaths: ["<rootDir>/src"],
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/**/*-protocols.ts',
      '!<rootDir>/src/**/*.module.ts',
      '!<rootDir>/src/**/entities/*.ts',
      '!<rootDir>/src/**/*.dto.ts',
      '!**/protocols/**',
      '!**/test/**',
    ],
    coverageDirectory: "coverage",
    testEnvironment: "node"
  }
  