module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    "no-console": "off",
    'no-debugger': 'off',
    'indent': 'off',
    "beforeColon": 'off',
    "afterColon": 'off',
    "quotes": 'off',
    "no-unused-vars": 'off',
    'spaced-comment':'off',
    'space-before-blocks':'off',
    'space-in-parens':'off',
    'keyword-spacing':'off',
    'comma-dangle':'off',
    'no-multi-spaces':'off',
    'camelcase':'off',
    'key-spacing':'off',
    'space-infix-ops':'off',
    'semi': 0,
    "space-before-function-paren": 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
