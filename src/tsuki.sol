// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ValidationDAO} from "./validationDAO.sol";
import {VRFConsumerBaseV2} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {VRFV2PlusClient} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {VRFCoordinatorV2Interface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

contract Tsuki is ERC721, VRFConsumerBaseV2 {
    uint256 private immutable PRICE = 1 ether;
    uint256 private immutable ARTIST_MONTHLY_FEE = 0.1 ether;
    address dao;
    ValidationDAO validationDAO = ValidationDAO(payable(dao));

    uint256 tokenId = 0;
    uint256[] tokens;
    uint256 s_subscriptionId;
    bytes32 s_keyHash;
    uint16 reqConfirmations = 3;
    uint32 callBackGasLim = 100000;
    address receiver;
    uint16 minReq = 3;
    address vrfCoordinator;
    uint256 private supply;

    mapping(address => bool) private artistList;
    mapping(uint256 tokenid => address artist) private artists;
    mapping(uint256 tokenid => string uri) private tokenUri;
    mapping(address => uint256) private artistExpiry;

    error User_Already_Has_Artist_Tag();
    error Pay_Artist_Fee();
    error User_Must_Be_Artist();
    error Not_Allowed_To_Call_Given_Method();
    error Value_Less_Than_Price();
    error Not_For_Sale_Now();
    error Try_After_Some_Time();

    constructor(
        address vrfcoordinator,
        uint256 subId,
        bytes32 keyHash
    ) ERC721("tsuki", "TSK") VRFConsumerBaseV2(vrfcoordinator) {
        vrfCoordinator = vrfcoordinator;
        s_subscriptionId = subId;
        s_keyHash = keyHash;
        supply = 0;
    }

    function addArtist(address user) external payable {
        if (msg.value < ARTIST_MONTHLY_FEE) revert Pay_Artist_Fee();
        if (isArtist(user)) revert User_Already_Has_Artist_Tag();

        payable(address(validationDAO)).transfer(0.05 ether);

        artistList[user] = true;
        artistExpiry[user] = block.timestamp + 30 days;
    }

    function becomeValidator(address user) external {
        if (!isArtist(user)) revert User_Must_Be_Artist();

        validationDAO.addValidator(user);
    }

    function removeValidator(address user) external {
        validationDAO.removeValidator(user);
    }

    function receiveSubmission(
        address sender,
        string memory metadata
    ) external returns (uint256) {
        if (!isArtist(sender)) revert User_Must_Be_Artist();

        uint256 id = validationDAO.addNewSubmission(sender, metadata);
        return id;
    }

    function approveNew(string memory metadata) external {
        if (msg.sender != address(validationDAO))
            revert Not_Allowed_To_Call_Given_Method();

        tokenUri[tokenId] = metadata;
        tokens.push(tokenId);
        tokenId++;
        supply++;
    }

    function tokenURI(
        uint256 tokenid
    ) public view override returns (string memory) {
        return tokenUri[tokenid];
    }

    function mint(address to) external payable {
        if (msg.value < PRICE) revert Value_Less_Than_Price();
        if (supply < 5) revert Not_For_Sale_Now();
        if (receiver != address(0)) revert Try_After_Some_Time();

        payable(address(validationDAO)).transfer(0.5 ether);
        receiver = to;

        VRFCoordinatorV2Interface(vrfCoordinator).requestRandomWords(
            s_keyHash,
            uint64(s_subscriptionId),
            minReq,
            callBackGasLim,
            1
        );
    }

    function fulfillRandomWords(
        uint256 /*requestId*/,
        uint256[] memory randomWords
    ) internal override {
        uint256 num = randomWords[0];
        uint256 id = num % tokens.length;
        uint256 tokenid = tokens[id];

        address artist = artists[tokenId];
        payable(artist).transfer(0.3 ether);

        tokens[id] = tokens[tokens.length - 1];
        tokens.pop();
        supply--;

        _safeMint(receiver, tokenid);
        receiver = address(0);
    }

    function isArtist(address user) public view returns (bool) {
        return (artistList[user] && artistExpiry[user] > block.timestamp);
    }

    function price() public pure returns (uint256) {
        return PRICE;
    }

    function updateDaoAddress(address dAddr) external {
        dao = dAddr;
        validationDAO = ValidationDAO(payable(dAddr));
    }

    function totalSupply() public view returns (uint256) {
        return supply;
    }
}
