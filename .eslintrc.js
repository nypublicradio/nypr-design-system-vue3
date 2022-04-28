module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    // "plugin:storybook/recommended",
    // "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "plugin:@peeky/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["vue"],
  "rules": {
    'vue/no-v-html': 0
  }
};