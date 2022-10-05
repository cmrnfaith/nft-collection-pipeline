const basePath = process.cwd();
const layerDir = `${basePath}/layers`;

const { getDirectories, getFiles } = require("../src/weightGenerator");

function checkForDashes() {
  const layers = getDirectories(layerDir);
  var testPassed = true;
  layers.forEach((layer) => {
    files = getFiles(layerDir + "/" + layer);
    files.forEach((file) => {
      if (file.includes("-")) {
        testPassed = false;
      }
    });
  });
  return testPassed;
}

test("All files in the layers folder don't have dashes.", () => {
  expect(checkForDashes()).toBe(true);
});

test("Test layer directory access.", () => {
  expect(getDirectories(layerDir).length).toBeGreaterThan(0);
});

test("Test layer files exist.", () => {
  expect(getFiles(`${layerDir}/Background`).length).toBeGreaterThan(0);
});
