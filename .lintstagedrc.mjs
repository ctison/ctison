/** @type {Record<string, string | string[] | ((filenames: string[]) => string | string[] | Promise<string | string[]>)>} */
export default {
  'package.json': 'sort-package-json',
  '*.{js,ts,.jsx,.tsx,cjs,mjs,json,md,yaml,yml,html,css}': 'prettier --write',
  '*.{?(c|m)js[x],ts[x]}': (filenames) => [
    ...filenames.map((filename) => `eslint --max-warnings=0 '${filename}'`),
  ],
};
