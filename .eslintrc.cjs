module.exports = {
  root: true,
  env: { browser: true, es2023: true, node: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["import", "jsdoc", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:jsdoc/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-console": "off",
    "jsdoc/require-returns": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns-description": "off",
  },
};
