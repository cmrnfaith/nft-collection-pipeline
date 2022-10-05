const basePath = process.cwd();
const { removeHashesFromFiles } = require(`${basePath}/src/weightGenerator.js`);

(() => {
  removeHashesFromFiles();
})();
