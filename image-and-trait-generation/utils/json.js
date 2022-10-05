const basePath = process.cwd();
const { buildSetup } = require(`${basePath}/src/main.js`);
const { createJsonList } = require(`${basePath}/src/jsonGenerator.js`);

(() => {
  buildSetup();
  createJsonList();
})();
