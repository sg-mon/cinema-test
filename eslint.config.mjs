// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/no-multiple-template-root": 0,
    "vue/html-self-closing": 0,
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    "@stylistic/brace-style": ["error", "1tbs"],
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
        allowEmptyLines: false,
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 2,
        },
      },
    ],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/block-order": [
      "error",
      {
        order: [["template"], "script", "style"],
      },
    ],
  },
});
