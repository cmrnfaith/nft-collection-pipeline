const basePath = process.cwd();

const fs = require("fs");
const layerDir = `${basePath}/layers`;
const jsonDir = `${basePath}/json`;

const avaTraits = [
  {
    trait_name: "Heart",
    items: [
      "Blood",
      "Crystals",
      "Fire",
      "Metal",
      "Minerals",
      "Plasma",
      "Seed",
      "Toxin",
      "Water",
    ],
  },
  {
    trait_name: "Mind",
    items: ["00", "01", "10", "11"],
  },
  {
    trait_name: "Skeleton",
    items: ["Classic", "Pro", "X", "Circuit"],
  },

  {
    trait_name: "Headwear",
    items: ["Stealth", "Cute"],
  },
  {
    trait_name: "Headwear_Material",
    items: ["MatA"],
  },

  {
    trait_name: "Arms",
    items: ["Mysterious", "Organic", "Stealth", "Industrial", "Cute"],
  },
  {
    trait_name: "Arms_Material",
    items: ["MatA", "MatB", "MatC"],
  },

  {
    trait_name: "Legs",
    items: ["Mysterious", "Organic", "Stealth", "Industrial", "Cute"],
  },
  {
    trait_name: "Legs_Material",
    items: ["MatA", "MatB", "MatC"],
  },

  {
    trait_name: "Torso",
    items: ["Mysterious", "Organic", "Stealth", "Industrial", "Cute"],
  },
  {
    trait_name: "Torso_Material",
    items: ["MatA", "MatB", "MatC"],
  },
];

function appendToFilename(filename, string) {
  var dotIndex = filename.lastIndexOf(".");
  if (dotIndex == -1) return filename + string;
  else
    return (
      filename.substring(0, dotIndex) + string + filename.substring(dotIndex)
    );
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

function getFiles(path) {
  return fs.readdirSync(path);
}

function getWeight(file) {
  // TODO: add weights based on either a json file or config list
  // For now will just assign a random weight between 1 and 100
  return getRandomNumberBetween(1, 100);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addWeightsToFiles() {
  removeWeightsFromFiles();
  const layers = getDirectories(layerDir);
  console.log(layers);
  layers.forEach((layer) => {
    files = getFiles(layerDir + "/" + layer);
    files.forEach((file) => {
      fileWeight = getWeight(file);
      stringWeight = `#${fileWeight}`;
      newFileName = appendToFilename(file, stringWeight);

      oldFilePath = `${layerDir}/${layer}/${file}`;
      newFilePath = `${layerDir}/${layer}/${newFileName}`;

      fs.rename(oldFilePath, newFilePath, function (err) {
        if (err) throw err;
        // console.log("File Renamed.");
      });
      console.log(newFileName);
    });
    console.log(files);
  });
  console.log("Added weights to files within the layers folder");
}

function removeWeightFromFilename(file, rarityDelimiter) {
  console.log(file);
  if (file.indexOf(rarityDelimiter) == -1) return file;
  var removed = file.slice(0, file.indexOf(rarityDelimiter));
  return `${removed}.png`;
}

function removeWeightsFromFiles() {
  const layers = getDirectories(layerDir);
  layers.forEach((layer) => {
    files = getFiles(layerDir + "/" + layer);
    files.forEach((file) => {
      newFileName = removeWeightFromFilename(file, "#");

      oldFilePath = `${layerDir}/${layer}/${file}`;
      newFilePath = `${layerDir}/${layer}/${newFileName}`;

      fs.rename(oldFilePath, newFilePath, function (err) {
        if (err) throw err;
        // console.log("File Renamed.");
      });
      console.log(newFileName);
    });
  });
  console.log("Removed weights to files within the layers folder");
}

function removeDashesFromFiles() {
  const layers = getDirectories(layerDir);
  layers.forEach((layer) => {
    files = getFiles(layerDir + "/" + layer);
    files.forEach((file) => {
      newFileName = file.replace(/-/g, "_");

      oldFilePath = `${layerDir}/${layer}/${file}`;
      newFilePath = `${layerDir}/${layer}/${newFileName}`;

      fs.rename(oldFilePath, newFilePath, function (err) {
        if (err) throw err;
        // console.log("File Renamed.");
      });
      console.log(newFileName);
    });
  });
}

function removeHashesFromFiles() {
  const layers = getDirectories(layerDir);
  layers.forEach((layer) => {
    files = getFiles(layerDir + "/" + layer);
    files.forEach((file) => {
      newFileName = file.replace(/#/g, "");

      oldFilePath = `${layerDir}/${layer}/${file}`;
      newFilePath = `${layerDir}/${layer}/${newFileName}`;

      fs.rename(oldFilePath, newFilePath, function (err) {
        if (err) throw err;
        // console.log("File Renamed.");
      });
      console.log(newFileName);
    });
  });
}

function calculateRequiredFileNumbers(percentageNeeded, totalFiles) {
  return Math.floor((percentageNeeded / totalFiles) * 100);
}

function generateDirectoryListJsonFile(layerDir) {
  const layers = getDirectories(layerDir);
  const jsonFile = {};
  layers.forEach((layer) => {
    files = getFiles(layerDir + "/" + layer);
    var fileList = [];
    files.forEach((file) => {
      var newFile = {
        name: file,
        collection_percent: ((1 / files.length) * 100).toFixed(5),
      };
      fileList.push(newFile);
    });
    jsonFile[layer] = fileList;
    console.log(`Base Percentage: ${((1 / files.length) * 100).toFixed(5)}`);
  });
  fs.writeFileSync(`${jsonDir}/_percentage.json`, JSON.stringify(jsonFile));
}

module.exports = {
  addWeightsToFiles,
  removeWeightsFromFiles,
  removeDashesFromFiles,
  getDirectories,
  getFiles,
  getWeight,
  removeHashesFromFiles,
  getRandomNumberBetween,
  calculateRequiredFileNumbers,
  generateDirectoryListJsonFile,
};
