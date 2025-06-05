// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "../lib/forge-std/src/Test.sol";
import {console} from "../lib/forge-std/src/console.sol";
import {ArtistSubmission} from "../src/ArtistSubmission.sol";
import {ArtistSubscription} from "../src/ArtistSubscription.sol";
import {Dao} from "../src/Dao.sol";
import {NFTSale} from "../src/NFTSale.sol";
import {TsukiNFT} from "../src/TsukiNFT.sol";
import {DeployTsuki} from "../script/DeployTsuki.s.sol";
import {console} from "../lib/forge-std/src/console.sol";

contract TsukiTest is Test {
    ArtistSubmission public artistSubmission;
    ArtistSubscription public artistSubscription;
    Dao public dao;
    NFTSale nFTSale;
    TsukiNFT public tsukiNFT;

    address public owner;
    address public artist1 = makeAddr("artist1");
    address public artist2 = makeAddr("artist2");
    address public buyer = makeAddr("buyer");
    address public nonArtist = makeAddr("nonArtist");
    address public darshit = makeAddr("darshit"); // randome person who is not an artist

    function setUp() public {
        DeployTsuki deployer = new DeployTsuki();
        (
            tsukiNFT,
            dao,
            nFTSale,
            artistSubscription,
            artistSubmission
        ) = deployer.run();
        owner = dao.owner();

        vm.deal(artist1, 10 ether);
        vm.deal(artist2, 10 ether);
        vm.deal(buyer, 10 ether);
    }

    // 1) ArtistSubscription.sol

    function testIfSubscriptionPlanOfPremiumIsSetCorrectly() public {
        vm.startPrank(artist1);

        uint256 duration = 30 days; // We will try checking if the premium plan is set correctly by Ankit Bidsent code or not.
        uint256 subscriptionPriceForPremium = artistSubscription
            .getSubscriptionPrice(ArtistSubscription.SubscriptionType.PREMIUM);
        // We cannot extract enum from a contract instance , as shown in aboev line

        // Now we will do a subscripition for the contract instance and check it with REal premium
        artistSubscription.subscribe{value: subscriptionPriceForPremium}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            duration
        );
        ArtistSubscription.Subscription memory sub = artistSubscription
            .getSubscription(artist1);

        assertEq(
            uint256(sub.subscriptionType),
            uint256(ArtistSubscription.SubscriptionType.PREMIUM)
        );
        vm.stopPrank();
    }

    function testIfSubscriptionPlanOfProIsSetCorrectly() public {
        vm.startPrank(artist1);

        uint256 duration = 30 days;
        uint256 subscriptionPriceForPro = artistSubscription
            .getSubscriptionPrice(ArtistSubscription.SubscriptionType.PRO);
        artistSubscription.subscribe{value: subscriptionPriceForPro}(
            ArtistSubscription.SubscriptionType.PRO,
            duration
        );
        ArtistSubscription.Subscription memory sub = artistSubscription
            .getSubscription(artist1);

        assertEq(
            uint256(sub.subscriptionType),
            uint256(ArtistSubscription.SubscriptionType.PRO)
        );
        vm.stopPrank();
    }

    function testIfSubscriptionPlanOfBasicIsSetCorrectly() public {
        vm.startPrank(artist1);

        uint256 duration = 30 days;
        uint256 subscriptionPriceForBasic = artistSubscription
            .getSubscriptionPrice(ArtistSubscription.SubscriptionType.BASIC);
        artistSubscription.subscribe{value: subscriptionPriceForBasic}(
            ArtistSubscription.SubscriptionType.BASIC,
            duration
        );
        ArtistSubscription.Subscription memory sub = artistSubscription
            .getSubscription(artist1);

        assertEq(
            uint256(sub.subscriptionType),
            uint256(ArtistSubscription.SubscriptionType.BASIC)
        );
        vm.stopPrank();
    }

    function testIfAmountGivenForSubscriptionIsNotEnough() public {
        vm.startPrank(artist1);
        // Arrange
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.BASIC
        );
        uint256 duration = 30 days;
        // Act
        vm.expectRevert(ArtistSubscription.Insufficient_Payment.selector);
        // Assert
        artistSubscription.subscribe{value: price - 1}(
            ArtistSubscription.SubscriptionType.BASIC,
            duration
        ); // funnding with less amt
        // Above line must revert

        vm.stopPrank();
    }

    function testIfArtistIsTryingToSubscribeButIsAlreadySubscribed() public {
        vm.startPrank(artist1);
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.BASIC
        );
        uint256 duration = 30 days;

        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.BASIC,
            duration
        ); //subscribing it first

        vm.expectRevert(ArtistSubscription.Already_Subscribed.selector);
        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.BASIC,
            duration
        ); // funnding again, so must reveerrt

        vm.stopPrank();
    }

    function testIfRenewSubscriptionWorksOrNOt() public {
        vm.startPrank(artist1);

        // Iniitally the user will subscribe as premium, then we change it to basic as renewal and check if its correct

        uint256 duration = 30 days;
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PREMIUM
        );
        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            duration
        );

        vm.warp(block.timestamp + duration + 1); // Fast forwardding to such a time, when the subsc must be expired
        // NOTE FOR ANKIT: I AM NOT DOING vm.roll , so u just check, since i dont know how to use it

        artistSubscription.renewSubscription{value: price}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            duration
        );

        ArtistSubscription.Subscription memory sub = artistSubscription
            .getSubscription(artist1);
        assertEq(
            uint256(sub.subscriptionType),
            uint256(ArtistSubscription.SubscriptionType.PREMIUM)
        );
        vm.stopPrank();
    }

    function testIfMaxSubmissionsPerWeekIsCorrect() public view {
        assertEq(
            artistSubscription.getMaxSubmissionsPerWeek(
                ArtistSubscription.SubscriptionType.PREMIUM
            ),
            5
        );
        assertEq(
            artistSubscription.getMaxSubmissionsPerWeek(
                ArtistSubscription.SubscriptionType.PRO
            ),
            10
        );
        assertEq(
            artistSubscription.getMaxSubmissionsPerWeek(
                ArtistSubscription.SubscriptionType.BASIC
            ),
            2
        );
    }

    function testIfTheRoyalityPercentageHasBeenSetCorrectlyOrNot() public view {
        assertEq(
            artistSubscription.getPercentageRoyalties(
                ArtistSubscription.SubscriptionType.PREMIUM
            ),
            10
        );
        assertEq(
            artistSubscription.getPercentageRoyalties(
                ArtistSubscription.SubscriptionType.BASIC
            ),
            5
        );
        assertEq(
            artistSubscription.getPercentageRoyalties(
                ArtistSubscription.SubscriptionType.PRO
            ),
            15
        );
    }

    // 2) ArtistSubmission.sol

    function testAnyNewSubmssionDoneByArtist() public {
        vm.startPrank(artist1);
        // First make the artist subscrbe.
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.BASIC
        );
        uint256 duration = 30 days;

        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.BASIC,
            duration
        ); //subscribing it first

        string memory contentHash = "DARshit"; // giving any randome hash

        uint256 submissionId = artistSubmission.newSubmission(contentHash); // came from instance of contract

        ArtistSubmission.Submission memory submis = artistSubmission
            .getSubmission(submissionId);

        assertEq(submis.id, submissionId);

        vm.stopPrank();
    }

    function testIfSubmissionIsDoneByaRandomePersonItMustRevert() public {
        vm.startPrank(artist1);
        vm.expectRevert(ArtistSubscription.Not_Artist.selector);
        artistSubmission.newSubmission("cool");

        vm.stopPrank();
    }

    function testWhenAnArtistDoesSubmissionAfterExpirationOfSubscription()
        public
    {
        vm.startPrank(artist1);

        // sabse pehle subscribe
        uint256 duration = 30 days;
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PRO
        );

        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.PRO,
            duration
        );

        // Now go to future and make the subscription expire
        vm.warp(block.timestamp + duration + 1);
        vm.expectRevert(ArtistSubmission.Subscription_Expired.selector);
        artistSubmission.newSubmission("ok");

        vm.stopPrank();
    }

    // 3) Dao.sol

    function testCheckIfTheVotingOnTheProposalWork() public {
        vm.startPrank(artist1);
        // First make the artist1 subscribe
        uint256 duration1 = 30 days;
        uint256 price1 = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PREMIUM
        );

        artistSubscription.subscribe{value: price1}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            duration1
        );

        vm.stopPrank();

        vm.startPrank(artist2);
        // Now make the artist2 subscribe....
        uint256 duration2 = 30 days;
        uint256 price2 = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PRO
        );

        artistSubscription.subscribe{value: price2}(
            ArtistSubscription.SubscriptionType.PRO,
            duration2
        );

        vm.stopPrank();

        // Now artisst2 will be submitting his work.
        vm.prank(artist1);
        uint256 subId = artistSubmission.newSubmission("artist1HasSubmitted");

        vm.prank(artist1);
        dao.castVote(subId, true);
        vm.prank(artist2);
        dao.castVote(subId, false);

        (, , uint256 posVotes, uint256 negVotes, ) = dao.s_proposals(subId);

        assertEq(posVotes, 1);
        assertEq(negVotes, 1);
    }

    function testVotingCanBeOnlyDoneByAnArtist() public {
        vm.startPrank(artist1);
        // First make the artist1 subscribe
        uint256 duration1 = 30 days;
        uint256 price1 = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PREMIUM
        );

        artistSubscription.subscribe{value: price1}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            duration1
        );

        vm.stopPrank();
        vm.prank(artist1);
        uint256 subId = artistSubmission.newSubmission("artist1HasSubmitted");
        vm.prank(darshit); // I cant vote, so below line must revert
        vm.expectRevert(Dao.Only_Artist_Can_Vote.selector);
        dao.castVote(subId, true);
    }

    function testDoubleVotingMustNotBeDone() public {
        vm.startPrank(artist1);
        uint256 duration = 30 days;
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PREMIUM
        );

        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            duration
        );

        uint256 subId = artistSubmission.newSubmission("new");
        dao.castVote(subId, true);
        vm.expectRevert(Dao.Already_Voted.selector);
        dao.castVote(subId, true);
        vm.stopPrank();
    }

    function testWhenProposalIsExecutedSuccesffullly() public {
        // Sabse pehle subscribe kre and submit
        vm.startPrank(artist1);
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.BASIC
        );
        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.BASIC,
            30 days
        );
        uint256 submissionId = artistSubmission.newSubmission("hellp");

        dao.castVote(submissionId, true);
        vm.stopPrank();

        // Move to time, whem we can vote on propasal
        vm.warp(block.timestamp + 8 days);

        vm.prank(owner);
        dao.executeProposal(submissionId);

        assertEq(tsukiNFT.getTotalTokens(), 1);
        assertEq(tsukiNFT.s_forSale(), 1);
    }

    function testExecuteFailedProposal() public {
        //here , Apan dono voters se fail vote krwayege , then lets check
        vm.startPrank(artist1);
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.BASIC
        );
        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.BASIC,
            30 days
        );
        uint256 submissionId = artistSubmission.newSubmission("daredevil");
        dao.castVote(submissionId, false);
        vm.stopPrank();

        vm.startPrank(artist2);
        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.BASIC,
            30 days
        );
        dao.castVote(submissionId, false);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);

        vm.prank(owner);
        dao.executeProposal(submissionId);

        // since vote got fail , totall tokesn must be 0.
        assertEq(tsukiNFT.getTotalTokens(), 0);
        assertEq(tsukiNFT.s_forSale(), 0);
    }

    // 4) NFTSale.sol

    function testCheckIfNftWasBuyedAndTransferredOrNot() public {
        vm.startPrank(artist1);
        uint256 price = artistSubscription.getSubscriptionPrice(
            ArtistSubscription.SubscriptionType.PREMIUM
        );
        artistSubscription.subscribe{value: price}(
            ArtistSubscription.SubscriptionType.PREMIUM,
            30 days
        );
        uint256 submissionId = artistSubmission.newSubmission("random");
        dao.castVote(submissionId, true);
        vm.stopPrank();

        vm.warp(block.timestamp + 8 days);
        vm.prank(owner);
        dao.executeProposal(submissionId);

        uint256 nftPrice = nFTSale.PRICE_PER_NFT();
        uint256 artistBalanceBefore = artist1.balance;

        vm.prank(buyer);
        nFTSale.buyNFT{value: nftPrice}(0);

        assertEq(tsukiNFT.ownerOf(0), buyer);
        assertEq(tsukiNFT.s_forSale(), 0);
        assertTrue(tsukiNFT.isSold(0));

        uint256 expectedRoyalty = (nftPrice * 10) / 100;
        assertEq(artist1.balance, artistBalanceBefore + expectedRoyalty);
    }
}