const basePath = process.cwd();
const {
  removeWeightsFromFiles,
} = require(`${basePath}/src/weightGenerator.js`);

(() => {
  removeWeightsFromFiles();
})();
