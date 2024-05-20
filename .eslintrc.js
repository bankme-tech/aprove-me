module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: false,
        ignoreRestArgs: false,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'class',
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
      {
        selector: 'classProperty',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'classProperty',
        modifiers: ['public'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'function',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'method',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['variable'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
  },
};
