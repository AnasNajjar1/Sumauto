module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    env: {
        browser: true,
        jasmine: true,
        jest: true,
        node: true,
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-empty-interface': ['warn'],
        'no-underscore-dangle': 'off',
        '@typescript-eslint/naming-convention': ['warn'],
        'class-methods-use-this': 'off',
        'arrow-body-style': ['warn'],
        'no-restricted-syntax': ['warn'],
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-param-reassign': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-danger': 'off', 
        'react-hooks/exhaustive-deps':'warn',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react-hooks/exhaustive-deps': 'off'

    },
    ignorePatterns: ['.eslintrc.js']
};
 