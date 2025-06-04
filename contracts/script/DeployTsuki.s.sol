
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {TsukiNFT} from "../src/TsukiNFT.sol";
import {Dao} from "../src/Dao.sol";
import {NFTSale} from "../src/NFTSale.sol";
import {ArtistSubscription} from "../src/ArtistSubscription.sol";
import {ArtistSubmission} from "../src/ArtistSubmission.sol";

contract DeployTsuki is Script {
    TsukiNFT public tsukiNFT;
    Dao public dao;
    NFTSale public nftSale;
    ArtistSubscription public artistSubscription;
    ArtistSubmission public artistSubmission;
    address daoOwner = 0xa53c827DA36eC381216a08339B5197202F51497E;

    function run()
        external
        returns (TsukiNFT, Dao, NFTSale, ArtistSubscription, ArtistSubmission)
    {
        vm.startBroadcast();

        artistSubscription = new ArtistSubscription();
        artistSubmission = new ArtistSubmission(address(artistSubscription));
        tsukiNFT = new TsukiNFT();
        dao = new Dao(
            address(artistSubmission),
            address(artistSubscription),
            address(tsukiNFT),
            daoOwner
        );
        nftSale = new NFTSale(address(tsukiNFT), address(artistSubscription));
        tsukiNFT.setDao(address(dao));
        tsukiNFT.setNftSale(address(nftSale));
        artistSubmission.setDao(address(dao));

        vm.stopBroadcast();
        return (tsukiNFT, dao, nftSale, artistSubscription, artistSubmission);
    }
}
