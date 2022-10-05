const basePath = process.cwd();
const { removeDashesFromFiles } = require(`${basePath}/src/weightGenerator.js`);

(() => {
  removeDashesFromFiles();
})();
