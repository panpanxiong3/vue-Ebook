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
    "beforeColon": false | true,
    "afterColon": true  | false,
    'semi': 0,
    "space-before-function-paren": 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
