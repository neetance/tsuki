// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Tsuki} from "../src/tsuki.sol";
import {ValidationDAO} from "../src/validationDAO.sol";
import {VRFCoordinatorV2Interface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import {LinkToken} from "../test/mocks/LinkToken.sol";

contract DeployTsuki is Script, LinkToken {
    address vrfCoordinator = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    bytes32 keyHash =
        0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    //uint256 subId;
    Tsuki tsuki;
    ValidationDAO validationDAO;
    VRFCoordinatorV2Interface iVRF;
    address token = 0x779877A7B0D9E8603169DdbD7836e478b4624789;
    uint96 FUND_AMOUNT = 3;

    function run() external returns (Tsuki, ValidationDAO) {
        iVRF = VRFCoordinatorV2Interface(vrfCoordinator);
        uint256 subId = iVRF.createSubscription();

        vm.startBroadcast();
        LinkToken(token).transferAndCall(
            vrfCoordinator,
            FUND_AMOUNT,
            abi.encode(subId)
        );
        vm.stopBroadcast();

        vm.startBroadcast();
        tsuki = new Tsuki(vrfCoordinator, subId, keyHash);
        validationDAO = new ValidationDAO(
            subId,
            vrfCoordinator,
            keyHash,
            address(tsuki)
        );
        vm.stopBroadcast();

        tsuki.updateDaoAddress(address(validationDAO));
        iVRF.addConsumer(uint64(subId), address(tsuki));
        iVRF.addConsumer(uint64(subId), address(validationDAO));

        return (tsuki, validationDAO);
    }
}
