const {
  cleanName,
  isDnaUnique,
  createDna,
  cleanDna,
  getRarityWeight,
  removeQueryStrings,
} = require("../src/main");

test("Clean name function correctly removes unwanted characters", () => {
  expect(cleanName("test_file#490.png")).toBe("test_file");
});

test("Clean name function correctly ignores characters", () => {
  expect(cleanName("test_file$490.png")).toBe("test_file$490");
});

test("Clean name function correctly handles jpg", () => {
  expect(cleanName("test_file$490.jpg")).toBe("test_file$490");
});

test("Base case for unique DNA.", () => {
  expect(isDnaUnique(new Set([("dna1", "dna2", "dna3", "dna4")]), "dna5")).toBe(
    true
  );
});

test("Empty DNA List.", () => {
  expect(isDnaUnique(new Set(), "dna5")).toBe(true);
});

test("Not unique.", () => {
  expect(
    isDnaUnique(new Set(["dna1", "dna2", "dna3", "dna4", "dna5"]), "dna5")
  ).toBe(false);
});

test("Create DNA supports multiple uses of a filename.", () => {
  expect(
    createDna([
      {
        id: 0,
        elements: [{ id: 1, filename: "file-0", weight: 1 }],
        name: "Background",
        blend: "source-over",
        opacity: 1,
        bypassDNA: false,
      },
      {
        id: 1,
        elements: [{ id: 2, filename: "file-1", weight: 1 }],
        name: "Eyes",
        blend: "source-over",
        opacity: 1,
        bypassDNA: false,
      },
      {
        id: 2,
        elements: [{ id: 3, filename: "file-1", weight: 1 }],
        name: "Mouths",
        blend: "source-over",
        opacity: 1,
        bypassDNA: false,
      },
    ])
  ).toBe("1:file-0-2:file-1-3:file-1");
});

test("Create DNA works as expected with unique names.", () => {
  expect(
    createDna([
      {
        id: 0,
        elements: [{ id: 1, filename: "file-0", weight: 1 }],
        name: "Background",
        blend: "source-over",
        opacity: 1,
        bypassDNA: false,
      },
      {
        id: 1,
        elements: [{ id: 2, filename: "file-1", weight: 1 }],
        name: "Eyes",
        blend: "source-over",
        opacity: 1,
        bypassDNA: false,
      },
      {
        id: 2,
        elements: [{ id: 4, filename: "file-2", weight: 1 }],
        name: "Mouths",
        blend: "source-over",
        opacity: 1,
        bypassDNA: false,
      },
    ])
  ).toBe("1:file-0-2:file-1-4:file-2");
});

test("Remove Query Strings works as expected.", () => {
  expect(removeQueryStrings("?.*$)/")).toBe("");
});

test("Clean DNA works on empty string.", () => {
  expect(cleanDna("")).toBe(0);
});
test("Clean DNA works on base case.", () => {
  expect(
    cleanDna(
      "0:Background_test.png-101:Eyes_0003s_0010_25.png-58:DigiMask_20220519_0000s_0001s_0059_Layer_66.png-45:DigiMask_20220519_0000s_0002s_0045_Layer_200.png"
    )
  ).toBe(0);
});

test("Clean DNA works on next case.", () => {
  expect(
    cleanDna(
      "101:Eyes_0003s_0010_25.png-58:DigiMask_20220519_0000s_0001s_0059_Layer_66.png-45:DigiMask_20220519_0000s_0002s_0045_Layer_200.png"
    )
  ).toBe(101);
});

test("Get Rarity works without a specified weight", () => {
  expect(getRarityWeight("test.png")).toBe(1);
});

test("Get Rarity works on base case", () => {
  expect(getRarityWeight("test#5.png")).toBe(5);
});
