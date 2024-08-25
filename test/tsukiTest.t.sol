// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {Tsuki} from "../src/tsuki.sol";
import {ValidationDAO} from "../src/validationDAO.sol";
import {DeployTsuki} from "../script/deployTsuki.s.sol";
import {VRFCoordinatorV2Mock} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/mocks/VRFCoordinatorV2Mock.sol";
import {Vm} from "forge-std/Vm.sol";

contract TsukiTest is Test {
    Tsuki tsuki;
    ValidationDAO validationDAO;
    DeployTsuki deployer;
    address vrfCoordinator = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;

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

    function testNewSubmission() external {
        address user = address(91);
        //vm.deal(address(this), 100 ether);

        tsuki.addArtist{value: 0.1 ether}(user);

        for (uint256 i = 2; i < 42; i++) {
            address val = address(uint160(i));
            tsuki.addArtist{value: 0.1 ether}(val);

            tsuki.becomeValidator(val);
        }

        // console.log(block.chainid);

        // vm.recordLogs();
        uint256 id = tsuki.receiveSubmission(user, "metadata");
        vm.roll(block.number + 4);
        // Vm.Log[] memory entries = vm.getRecordedLogs();
        // uint256 reqId = abi.decode(entries[2].data, (uint256));

        // vm.startBroadcast();
        // VRFCoordinatorV2Mock vrf = new VRFCoordinatorV2Mock(0.25 ether, 1e9);
        // vm.stopBroadcast();

        // VRFCoordinatorV2Mock(address(vrf)).fulfillRandomWords(
        //     uint256(reqId),
        //     address(validationDAO)
        // );

        assertEq(id, 0);
        assertEq(validationDAO.getNumValidators(), 40);

        for (uint256 i = 2; i < 42; i++) {
            address val = address(uint160(i));

            if (validationDAO.isVoter(id, val)) {
                vm.prank(val);
                validationDAO.voteFor(id);
            }
        }

        console.log(address(validationDAO).balance);
        validationDAO.performUpkeep("0x0");
        validationDAO.getSubmission(id);

        assertEq(tsuki.totalSupply(), 1);
        assertEq(tsuki.tokenURI(0), "metadata");

        vm.warp(block.timestamp + 35 days);
        vm.expectRevert(Tsuki.User_Must_Be_Artist.selector);
        tsuki.receiveSubmission(user, "metadata");

        tsuki.addArtist{value: 0.1 ether}(user);
        tsuki.receiveSubmission(user, "metadata");
        assertEq(validationDAO.getNumValidators(), 0);
    }
}
