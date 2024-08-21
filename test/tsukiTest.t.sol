// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {Tsuki} from "../src/tsuki.sol";
import {ValidationDAO} from "../src/validationDAO.sol";
import {DeployTsuki} from "../script/deployTsuki.s.sol";

contract TsukiTest is Test {
    Tsuki tsuki;
    ValidationDAO validationDAO;
    DeployTsuki deployer;

    function setUp() external {
        deployer = new DeployTsuki();
        (tsuki, validationDAO) = deployer.run();
    }

    function testAddArtist() external {
        address user = address(1);
        vm.deal(address(this), 1 ether);

        tsuki.addArtist{value: 0.1 ether}(user);
        assert(tsuki.isArtist(user) == true);
    }

    function testNewSubmission() external {}
}
