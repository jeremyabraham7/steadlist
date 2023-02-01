/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // No semicolon usage
    semi: [ 'error', 'never' ],

    // Full indentation
    indent: [
        'error',
        4,
        {
            SwitchCase: 1,
            ignoredNodes: ['TemplateLiteral'],
        },
    ],
  }
}
