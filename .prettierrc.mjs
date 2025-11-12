/** @type {import("prettier").Config} */

export default {
  semi: false,
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  jsxSingleQuote: false,
  quoteProps: "consistent",
  trailingComma: "es5",
  useTabs: true,
  endOfLine: "lf",
  arrowParens: "always",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro-organize-imports",
  ],
  overrides: [
    {
      files: ["*.json", "*.md", "*.toml", "*.yml"],
      options: {
        useTabs: false,
      },
    },
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
