module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
};
