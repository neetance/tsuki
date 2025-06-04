// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Dao} from "./Dao.sol";
import {NFTSale} from "./NFTSale.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract TsukiNFT is ERC721, Ownable {
    error Not_Authorized();

    uint256 private _tokenId; // Incremental token counter
    uint256 public s_forSale; // Tracks number of NFTs available for sale

    mapping(uint256 => address) public _tokenCreators; // token id to creators
    mapping(uint256 => string) public _tokenURIs;
    mapping(uint256 => bool) public isSold; // For tracking if a token has been sold
    Dao private _dao;
    NFTSale private _nftSale;

    constructor() ERC721("Tsuki", "TSK") Ownable(msg.sender) {
        _tokenId = 0;
        s_forSale = 0;
    }

    function mint(
        address _artist,
        string memory _contentHash
    ) external returns (uint256) {
        if (msg.sender != address(_dao)) revert Not_Authorized();

        _mint(address(this), _tokenId);
        _tokenCreators[_tokenId] = _artist;
        _tokenURIs[_tokenId] = _contentHash;
        _tokenId++;
        s_forSale++;

        return _tokenId - 1;
    }

    function transferToBuyer(
        address _buyer,
        uint256 _id
    ) external returns (uint256) {
        if (msg.sender != address(_nftSale)) revert Not_Authorized(); // Only callable by NFTSale.

        isSold[_id] = true;
        s_forSale--;
        _transfer(address(this), _buyer, _id);
        return _id;
    }

    function getTokenCreator(uint256 _id) public view returns (address) {
        return _tokenCreators[_id];
    }

    function getTotalTokens() public view returns (uint256) {
        return _tokenId;
    }

    function setDao(address _daoAddress) external onlyOwner {
        _dao = Dao(_daoAddress);
    }

    function setNftSale(address _nftSaleAddress) external onlyOwner {
        _nftSale = NFTSale(_nftSaleAddress);
    }
}
