// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // add your custom rules here
  rules: {
    'linebreak-style': 'off',
    'no-console': 'off',
  }
}