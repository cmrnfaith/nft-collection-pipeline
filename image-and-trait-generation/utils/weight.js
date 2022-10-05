const basePath = process.cwd();
const { addWeightsToFiles } = require(`${basePath}/src/weightGenerator.js`);

(() => {
  addWeightsToFiles();
})();
