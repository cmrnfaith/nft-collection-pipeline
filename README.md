# nft-collection-pipeline

This repo will be used to demostrate the full process of generating an NFT collection. The Repo contains code for creating the images based on a set of criteria, uploading to IPFS, and saving the metadata of each item. Additionally, the project will have the code necessary to publish on both the goerli and ethereum networks.

## Image and Trait Generation

This is where the images and metadata for the NFT Collection is generated. There is a selection of images available with the code necessary to test the layer building process.

### Building the packages

```bash
cd image-and-trait-generation
npm install
```

## Metadata Backend

This is the instructions for setting up and using the express backend. In this case I hosted the program on Heroku and saved the url within the contracts directly.

### Building the backend

```bash
cd metadata-backend
npm install
```

### Starting the backend

```bash
npm start
```

Running in development mode (restarts on save):

```bash
npm run dev
```
