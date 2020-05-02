module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
  },
  extends: ['airbnb'],
  globals: {
    __DEV__: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/core-modules': ['app'],
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      'babel-module': {
        root: ['./src/'],
      },
    },
  },
  rules: {
    'react/prop-types': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-var': 0,
    'no-undef': 'off',
    'max-len': 'off',
    'operator-linebreak': 'off',
    'no-trailing-spaces': 'off',
    'object-curly-newline': 'off',
    'react/jsx-wrap-multilines': 'off',
    'function-paren-newline': 'off',
    'no-confusing-arrow': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../'],
      },
    ],
    'arrow-parens': [2, 'as-needed'],
    indent: 'off',
    'import/prefer-default-export': 'off',
  },
};
