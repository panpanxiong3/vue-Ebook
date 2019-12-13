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
    'semi': 0,
    "space-before-function-paren": 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
