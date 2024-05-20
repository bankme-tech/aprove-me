module.exports = {
  extends: ['../../.eslintrc.js'],
  plugins: ['import-helpers'],
  overrides: [
    {
      files: ['*.decorator.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'function',
            format: ['PascalCase', 'camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
    {
      files: ['env.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'classProperty',
            modifiers: ['private'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'classProperty',
            modifiers: ['public'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
          },
        ],
      },
    },
    {
      files: ['*.document.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'classProperty',
            modifiers: ['private'],
            format: ['camelCase'],
          },
          {
            selector: ['variable'],
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
  ],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/@nestjs|^mongoose|@automock|vitest|supertest/',
          '/@vaner/',
          '/@domain/',
          '/@infra/',
          '/@application/',
          '/@presentation/',
          ['index'],
        ],
        alphabetize: {
          ignoreCase: true,
        },
      },
    ],
  },
};
