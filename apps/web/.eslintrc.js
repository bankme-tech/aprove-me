const { rules } = require('eslint-config-prettier');

module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
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
  ],
};
