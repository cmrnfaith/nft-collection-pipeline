const basePath = process.cwd();
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const fs = require("fs");

const jsonList = require(`${basePath}/json/_metadata.json`);
