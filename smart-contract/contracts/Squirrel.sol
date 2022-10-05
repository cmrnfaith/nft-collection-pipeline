// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Squirrel
 * Squirrel - a contract for my non-fungible nfts.
 */
contract Squirrel is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Squirrel", "OSC", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://nuthouse.herokuapp.com/api/token/";
    }

    // /**
    // * @dev Returns an URI for a given token ID
    // */
    // function tokenURI(uint256 _tokenId) public view returns (string memory) {
    // return Strings.strConcat(
    //     baseTokenURI(),
    //     Strings.uint2str(_tokenId)
    // );
    // }

    function contractURI() public pure returns (string memory) {
        return "https://nuthouse.herokuapp.com/api/contract/";
    }
}
