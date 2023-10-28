/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  arrowParens: 'always',
  endOfLine: 'auto',
  singleQuote: true,
  tailwindFunctions: ['clsx', 'cva'],
  organizeImportsSkipDestructiveCodeActions: true,
};
