const _testRegex = '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$'
module.exports = {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: 'src/test/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };