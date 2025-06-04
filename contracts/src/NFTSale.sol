
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TsukiNFT} from "./TsukiNFT.sol";
import {ArtistSubscription} from "./ArtistSubscription.sol";

contract NFTSale {
    // Errors
    error Insufficient_Payment();
    error No_Available_NFTs_For_Sale();

    // Events
    event NFTPurchased(address indexed buyer, uint256 indexed tokenId);

    // State variables
    uint256 public constant PRICE_PER_NFT = 0.01 ether;
    TsukiNFT public tsukiNFT;
    ArtistSubscription public artistSubscription;

    constructor(address _tsukiNFT, address _artistSubscription) {
        tsukiNFT = TsukiNFT(_tsukiNFT);
        artistSubscription = ArtistSubscription(_artistSubscription);
    }

    // Functions

    /**
     * @dev Allows users to buy an NFT by providing its ID.
     * @param _id The ID of the NFT to purchase, chosen randomly off-chain.
     * NOTE: 1.This function checks if the payment is sufficient and if there are NFTs available for sale.
     *       2.It also calculates the royalty amount based on the artist's subscription type and transfers it to the artist.
     */
    function buyNFT(uint256 _id) external payable {
        if (msg.value < PRICE_PER_NFT) {
            revert Insufficient_Payment();
        }
        if (tsukiNFT.s_forSale() == 0) revert No_Available_NFTs_For_Sale();

        address creater = tsukiNFT.getTokenCreator(_id);
        ArtistSubscription.Subscription memory subscription = artistSubscription
            .getSubscription(creater);
        uint256 royaltyPercent = artistSubscription.getPercentageRoyalties(
            subscription.subscriptionType
        );
        uint256 royaltyAmount = (msg.value * royaltyPercent) / 100;

        (bool sent, ) = payable(creater).call{value: royaltyAmount}("");
        require(sent, "Failed to send Ether to the artist");

        tsukiNFT.transferToBuyer(msg.sender, _id); // buyer and id
        emit NFTPurchased(msg.sender, _id);
    }
}
