const basePath = process.cwd();
const layerDir = `${basePath}/layers`;
const { generateTraitListJsonFile } = require("../src/weightGenerator.js");
const {
  layer_configuration,
  collection_count,
} = require("./src/config_new.js");

(() => {
  generateTraitListJsonFile(layerDir, layer_configuration, collection_count);
})();
