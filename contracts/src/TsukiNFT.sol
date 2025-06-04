// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Dao} from "./Dao.sol";
import {NFTSale} from "./NFTSale.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract TsukiNFT is ERC721, Ownable {
    // Errors
    error Not_Authorized();

    // State variables
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

    // Functions

    /**
     * @dev Mints a new NFT and assigns it to the contract.
     * @param _artist The address of the artist who submitted the artwork.
     * @param _contentHash The content hash of the NFT metadata.
     * @return The ID of the newly minted NFT.
     * NOTE: 1.This function can only be called by the DAO contract.
     *       2. The NFT is minted to the contract itself, and the creator and URI are set.
     */
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

    /**
     * @dev Transfers an NFT to a buyer after purchase, is called when a user buys an NFT and the id is selected on random.
     * @param _buyer The address of the buyer who purchased the NFT.
     * @param _id The ID of the NFT to transfer.
     * @return The ID of the transferred NFT.
     * NOTE: This function can only be called by the NFTSale contract.
     */
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

    /**
     * @dev Returns the address of the creator of a specific NFT.
     * @param _id The ID of the NFT.
     * @return The address of the creator of the NFT.
     */
    function getTokenCreator(uint256 _id) public view returns (address) {
        return _tokenCreators[_id];
    }

    /**
     * @dev Retrieves the total number of NFTs minted.
     * @return The total number of NFTs minted.
     */
    function getTotalTokens() public view returns (uint256) {
        return _tokenId;
    }

    /**
     * @dev Used to set the DAO contract address that will handle the submission proposals.
     * @param _daoAddress The address of the DAO contract.
     * NOTE: This function can only be called by the owner of the contract.
     */
    function setDao(address _daoAddress) external onlyOwner {
        _dao = Dao(_daoAddress);
    }

    /**
     * @dev Sets the NFTSale contract address that will handle the NFT sales.
     * @param _nftSaleAddress The address of the NFTSale contract.
     * NOTE: This function can only be called by the owner of the contract.
     */
    function setNftSale(address _nftSaleAddress) external onlyOwner {
        _nftSale = NFTSale(_nftSaleAddress);
    }
}
