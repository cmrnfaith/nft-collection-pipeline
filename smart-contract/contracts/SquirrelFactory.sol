// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./Squirrel.sol";

contract SquirrelFactory is FactoryERC721, Ownable {
    using Strings for string;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    address public proxyRegistryAddress;
    address public nftAddress;
    string public baseURI = "https://nuthouse.herokuapp.com/api/token/";

    /*
     * Enforce the existence of only 69 OpenSea squirrels.
     */
    uint256 SQUIRREL_SUPPLY = 69;

    /*
     * Three different options for minting Squirrels (basic, premium, and gold).
     */
    uint256 NUM_OPTIONS = 1;
    uint256 SINGLE_SQUIRREL_OPTION = 0;
    uint256 MULTIPLE_SQUIRREL_OPTION = 1;
    // uint256 LOOTBOX_OPTION = 2;
    uint256 NUM_SQUIRRELS_IN_MULTIPLE_SQUIRREL_OPTION = 4;

    constructor(address _proxyRegistryAddress, address _nftAddress) {
        proxyRegistryAddress = _proxyRegistryAddress;
        nftAddress = _nftAddress;

        fireTransferEvents(address(0), owner());
    }

    function name() override external pure returns (string memory) {
        return "Welcome to the Nuthouse";
    }

    function symbol() override external pure returns (string memory) {
        return "NUT";
    }

    function supportsFactoryInterface() override public pure returns (bool) {
        return true;
    }

    function numOptions() override public view returns (uint256) {
        return NUM_OPTIONS;
    }

    function transferOwnership(address newOwner) override public onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
        fireTransferEvents(_prevOwner, newOwner);
    }

    function fireTransferEvents(address _from, address _to) private {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    function mint(uint256 _optionId, address _toAddress) override public {
        // Must be sent from the owner proxy or owner.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        assert(
            address(proxyRegistry.proxies(owner())) == _msgSender() ||
                owner() == _msgSender() 
        );
        require(canMint(_optionId));

        Squirrel openSeaSquirrel = Squirrel(nftAddress);
        if (_optionId == SINGLE_SQUIRREL_OPTION) {
            openSeaSquirrel.mintTo(_toAddress);
        } else if (_optionId == MULTIPLE_SQUIRREL_OPTION) {
            for (
                uint256 i = 0;
                i < NUM_SQUIRRELS_IN_MULTIPLE_SQUIRREL_OPTION;
                i++
            ) {
                openSeaSquirrel.mintTo(_toAddress);
            }
        } 
    }

    function canMint(uint256 _optionId) override public view returns (bool) {
        if (_optionId >= NUM_OPTIONS) {
            return false;
        }

        Squirrel openSeaSquirrel = Squirrel(nftAddress);
        uint256 squirrelSupply = openSeaSquirrel.totalSupply();
        /* 
            Below you could create logic to select from various minting options
            using the optionId flag.
            For this basic example we will just use one per mint.
        */ 
        uint256 numItemsAllocated = 1;
        return squirrelSupply < (SQUIRREL_SUPPLY - numItemsAllocated);
    }

    function tokenURI(uint256 _optionId) override external view returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_optionId)));
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address,
        address _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256) public view returns (address _owner) {
        return owner();
    }
}
