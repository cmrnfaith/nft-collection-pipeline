const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Returns the metadata of each token
// Refer to: https://docs.opensea.io/docs/metadata-standards
app.get("/api/token/:token_id", (req, res) => {
  var token_id = req.params.token_id;
  var response = {
    name: `Squirrel #${token_id}`,
    description: "Lit Squirrel just trying to get it's nuts.",
    external_url: "cameronfaith.me",
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
