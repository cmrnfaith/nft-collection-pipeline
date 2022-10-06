const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// contractURI() support

const CONTRACT_URI_METADATA = {
  "welcome-to-the-nuthouse": {
    name: "Welcome to the Nuthouse",
    description:
      "Party of Squirrels trying to find their place in the branches of the Metaverse. Each squirrel will be used for future airdrops and will give the holder keys to game assets in the coming months. This collection was generated by cydro.eth, a developer at Jadu AR as a project supporting his love for squirrels.",
    image: "ipfs://QmNzqp4CWHMhFwTr22LaAB9SSwcpGmC1ABh4YY4tfForun",
    seller_fee_basis_points: 750, // Indicates a 7.5% seller fee.
    fee_recipient: "0x85b0dcabd1d92b77fb68bbea05db0aa7e080f621",
    // Where seller fees will be paid to.
    external_link: "https://cameronfaith.me",
  },
  "opensea-erc1155": {
    name: "Game assets",
    description: "Test contract to implement a custom set of game assets",
    image: "ipfs://QmTVZZ8j5tjE6oqrkyJD92wdbaKikwTo2nu9RSvBeQ2QS8",
    seller_fee_basis_points: 750, // Indicates a 7.5% seller fee.
    fee_recipient: "0x85b0dcabd1d92b77fb68bbea05db0aa7e080f621",
    // Where seller fees will be paid to.
    external_link: "https://cameronfaith.me",
  },
};
const CONTRACT_URI_METADATA_AVAILABLE = Object.keys(CONTRACT_URI_METADATA);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Returns the metadata of each token
// Refer to: https://docs.opensea.io/docs/metadata-standards
app.get("/api/token/:token_id", (req, res) => {
  var token_id = req.params.token_id;
  var response = {
    name: `Squirrel #${token_id}`,
    description:
      "Lonely squirrel in a big tree world just trying to get its next nut.",
    external_url: "https://cameronfaith.me",
    image: "ipfs://QmTVZZ8j5tjE6oqrkyJD92wdbaKikwTo2nu9RSvBeQ2QS8",
    attributes: [
      {
        trait_type: "Exists",
        value: "Yes",
      },
    ],
  };
  res.send(response);
});

// contractURI()
app.get("/api/contract/:contract_name", (req, res) => {
  var contract_name = req.params.contract_name;

  if (CONTRACT_URI_METADATA_AVAILABLE.contains(contract_name) == -1) {
    res.sendStatus(404);
  } else {
    res.send(CONTRACT_URI_METADATA[contract_name]);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
