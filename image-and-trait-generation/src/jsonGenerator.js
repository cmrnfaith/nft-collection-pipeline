const basePath = process.cwd();
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const fs = require("fs");

const jsonList = require(`${basePath}/json/_metadata.json`);

const { format, debugLogs } = require(`${basePath}/src/config.js`);
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;
var metadataList = [];
var attributesList = [];

const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(_renderObject.loadedImage, 0, 0, format.width, format.height);

  addAttributes(_renderObject);
};

const addAttributes = (_element) => {
  let selectedElement = _element.layer;
  attributesList.push({
    trait_type: selectedElement.name,
    value: selectedElement.value,
  });
};

const loadLayerImg = async (_layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const getLayers = async (object) => {
  var results = object.attributes;
  results.forEach(
    (attribute) =>
      (attribute.path = `${layersDir}/${attribute.trait_type}/${attribute.value}.png`)
  );
  return results;
};

const createJsonList = async () => {
  let editionCount = 1;

  while (editionCount <= jsonList.list.length) {
    console.log(jsonList.list[editionCount - 1]);
    let results = await getLayers(jsonList.list[editionCount - 1]);
    let loadedElements = [];
    console.log(results);

    results.forEach((layer) => {
      loadedElements.push(loadLayerImg(layer));
    });

    await Promise.all(loadedElements).then((renderObjectArray) => {
      debugLogs ? console.log("Clearing canvas") : null;
      ctx.clearRect(0, 0, format.width, format.height);
      console.log(renderObjectArray);
      renderObjectArray.forEach((renderObject, index) => {
        drawElement(renderObject, index, results.length);
      });

      debugLogs
        ? console.log(
            "Editions left to create: ",
            jsonList.list.length - editionCount
          )
        : null;
      saveImage(editionCount);
      // addMetadata(newDna, abstractedIndexes[0]);
      // saveMetaDataSingleFile(editionCount);
      console.log(`Created edition: ${editionCount}}`);
    });

    editionCount++;
  }
};

module.exports = { createJsonList };
