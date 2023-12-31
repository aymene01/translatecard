module.exports = {
    "parser": "vue-eslint-parser",
    "parserOptions": {
      "parser": "@typescript-eslint/parser",
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "extends": ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended"],
    "rules": {
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off"
    }
  }
  