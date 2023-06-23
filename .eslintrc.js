module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    // "plugin:storybook/recommended",
    // "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["vue", "perfectionist"],
  "rules": {
    "perfectionist/sort-imports": [
      "error",
      {
        "order": "asc",
        "type": "natural",
      }
    ],
    "perfectionist/sort-named-imports": [
      "error",
      {
        "order": "asc",
        "type": "natural",
      }
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        "order": "asc",
        "type": "natural",
      }
    ],
    "vue/no-v-html": 0,
  }
}