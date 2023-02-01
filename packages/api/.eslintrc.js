module.exports = {
  extends: ["../../.eslintrc.js"],
  rules: {
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-types": "off",

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
  },
}
