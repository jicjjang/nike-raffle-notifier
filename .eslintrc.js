module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off', // 빈 interface 허용
    '@typescript-eslint/ban-types': 'off', // 빈 object 허용
    '@typescript-eslint/no-explicit-any': 'off', // any 허용
  },
};
