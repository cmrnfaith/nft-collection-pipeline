const basePath = process.cwd();

// General metadata for Ethereum
const namePrefix = "Squirrel";
const description = "This is the ";
const baseUri = "";

const layerConfigurations = [
  {
    grow_edition_size_to: 15,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
    ],
  },
  {
    grow_edition_size_to: 30,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
      { name: "Sunglasses" },
    ],
  },
  {
    grow_edition_size_to: 35,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
      { name: "Hats" },
    ],
  },
  {
    grow_edition_size_to: 40,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
      { name: "Sunglasses" },
    ],
  },
  {
    grow_edition_size_to: 55,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
      { name: "Hats" },
      { name: "Sunglasses" },
    ],
  },
  {
    grow_edition_size_to: 65,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
      { name: "FaceCoverings" },
      { name: "Hats" },
    ],
  },
  {
    grow_edition_size_to: 69,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "BodyAndTails" },
      { name: "Coats" },
      { name: "Eyes" },
      { name: "Eyebrows" },
      { name: "Mouths" },
      { name: "FaceCoverings" },
      { name: "Sunglasses" },
      { name: "Hats" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1024,
  height: 1024,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: -1,
  quality: 100,
  delay: 400,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 50,
  order: "MIXED", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 400,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  gif,
  preview_gif,
};
