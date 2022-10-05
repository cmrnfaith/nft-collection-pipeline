const basePath = process.cwd();
const layerDir = `${basePath}/layers`;
const { generateDirectoryListJsonFile } = require("../src/weightGenerator.js");

(() => {
  generateDirectoryListJsonFile(layerDir);
})();
