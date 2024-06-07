module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module"
    },
    plugins: ["@typescript-eslint/eslint-plugin", "@typescript-eslint", "import"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    root: true,
    env: {
        node: true,
        jest: true
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: "./tsconfig.json"
            }
        }
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "no-console": "warn",
        "no-duplicate-imports": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/strict-property-initialization": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-var-requires": "warn",
        "prettier/prettier": [
            "error",
            {
                printWidth: 120
            }
        ],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-multiple-empty-lines": [
            "error",
            {
                max: 1,
                maxEOF: 1
            }
        ],
        "import/no-unresolved": [
            "error",
            {
                ignore: ["^@/"]
            }
        ],
        "no-restricted-imports": [
            "warn",
            {
                patterns: ["src/*"]
            }
        ]
    },
    overrides: [
        {
            files: ["tests/**/*"],
            env: {
                jest: true
            }
        }
    ]
};
