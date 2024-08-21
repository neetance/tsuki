// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ValidationDAO} from "./validationDAO.sol";
import {VRFConsumerBaseV2Plus} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract Tsuki is ERC721, VRFConsumerBaseV2Plus {
    uint256 private immutable PRICE = 1 ether;
    uint256 private immutable ARTIST_MONTHLY_FEE = 0.1 ether;
    address dao;
    ValidationDAO validationDAO = ValidationDAO(dao);

    uint256 tokenId = 0;
    uint256[] tokens;
    uint256 s_subscriptionId;
    bytes32 s_keyHash;
    uint16 reqConfirmations = 3;
    uint32 callBackGasLim = 100000;
    address receiver;

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

    constructor(
        address vrfCoordinator,
        uint256 subId,
        bytes32 keyHash
    ) ERC721("tsuki", "TSK") VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subId;
        s_keyHash = keyHash;
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
    ) external {
        validationDAO.addNewSubmission(sender, metadata);
    }

    function approveNew(string memory metadata) external {
        if (msg.sender != address(validationDAO))
            revert Not_Allowed_To_Call_Given_Method();

        tokenUri[tokenId] = metadata;
        tokens.push(tokenId);
        tokenId++;
    }

    function tokenURI(
        uint256 tokenid
    ) public view override returns (string memory) {
        return tokenUri[tokenid];
    }

    function mint(address to) external payable {
        if (msg.value < PRICE) revert Value_Less_Than_Price();
        if (tokens.length < 5) revert Not_For_Sale_Now();

        payable(address(validationDAO)).transfer(0.5 ether);
        receiver = to;

        s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: reqConfirmations,
                callbackGasLimit: callBackGasLim,
                numWords: 1,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );
    }

    function fulfillRandomWords(
        uint256 /*requestId*/,
        uint256[] calldata randomWords
    ) internal override {
        uint256 num = randomWords[0];
        uint256 id = num % tokens.length;
        uint256 tokenid = tokens[id];

        address artist = artists[tokenId];
        payable(artist).transfer(0.3 ether);

        tokens[id] = tokens[tokens.length - 1];
        tokens.pop();

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
        validationDAO = ValidationDAO(dAddr);
    }
}
