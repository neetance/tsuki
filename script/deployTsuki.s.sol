// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Tsuki} from "../src/tsuki.sol";
import {ValidationDAO} from "../src/validationDAO.sol";

contract DeployTsuki is Script {
    address vrfCoordinator = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
    bytes32 keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint256 subId =
        103542902444888252927798864659811493469178018666775450876002459352046167952252;
    Tsuki tsuki;
    ValidationDAO validationDAO;

    function run() external returns (Tsuki, ValidationDAO) {
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
        return (tsuki, validationDAO);
    }
}
