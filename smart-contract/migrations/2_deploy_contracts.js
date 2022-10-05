const Squirrel = artifacts.require("./Squirrel.sol");
const SquirrelFactory = artifacts.require("./SquirrelFactory.sol");

const DEPLOY_SQUIRRELS = true;
const DEPLOY_SQUIRRELS_SALE = true;

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for goerli and mainnet.
  let proxyRegistryAddress = "";
  if (network === "goerli") {
    proxyRegistryAddress = "0x1E525EEAF261cA41b809884CBDE9DD9E1619573A";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  if (DEPLOY_SQUIRRELS) {
    await deployer.deploy(Squirrel, proxyRegistryAddress, { gas: 5000000 });
  }
  if (DEPLOY_SQUIRRELS_SALE) {
    await deployer.deploy(
      SquirrelFactory,
      proxyRegistryAddress,
      Squirrel.address,
      { gas: 7000000 }
    );
    const squirrel = await Squirrel.deployed();
    await squirrel.transferOwnership(SquirrelFactory.address);
  }
};
