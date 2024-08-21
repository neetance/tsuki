// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {VRFConsumerBaseV2Plus} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {AutomationCompatibleInterface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {Tsuki} from "./tsuki.sol";

contract ValidationDAO is VRFConsumerBaseV2Plus, AutomationCompatibleInterface {
    enum State {
        ONGOING,
        ACCEPTED,
        REJECTED
    }

    struct Submission {
        State state;
        address sender;
        uint256 startTime;
        uint256 deadLine;
        uint256 negVotes;
        uint256 posVotes;
        uint256 id;
        string metadata;
    }

    event newSubmission(address indexed sender, uint256 id);
    event voted(uint256 id, address indexed voter, string vote);
    event executed(uint256 id, string result);

    error Not_Chosen_To_Vote_On_Given_Submission();
    error Already_Voted_For_Given_Submission();
    error Voting_Period_For_Given_Submission_Over();
    error Not_A_Validator();
    error Not_Allowed_To_Call_Given_Method();

    uint256 private submissionId = 0;
    uint256 private immutable INTERVAL = 5 days;
    mapping(uint256 submissionid => mapping(address voter => bool voted)) hasVoted;
    mapping(uint256 submissionid => mapping(address validator => bool selected)) votersList;
    address[] private validators;
    Submission[] submissions;
    uint256 s_subscriptionId;
    bytes32 s_keyHash;
    uint16 reqConfirmations = 3;
    uint32 callBackGasLim = 100000;
    uint256 private immutable reward = 0.01 ether;
    uint256 currId = 0;
    uint256 acceptanceReward = 0.1 ether;
    Tsuki tsuki;

    constructor(
        uint256 subscriptionId,
        address vrfCoordinator,
        bytes32 keyHash,
        address tsukiAddr
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
        s_keyHash = keyHash;
        tsuki = Tsuki(tsukiAddr);
    }

    function addNewSubmission(
        address _sender,
        string memory metadata
    ) external returns (uint256) {
        Submission memory submission = Submission(
            State.ONGOING,
            _sender,
            block.timestamp,
            block.timestamp + INTERVAL,
            0,
            0,
            submissionId,
            metadata
        );

        emit newSubmission(_sender, submissionId);
        submissionId++;
        submissions.push(submission);

        uint256 size = validators.length;
        for (uint256 i = 0; i < size; i++) {
            if (i == validators.length) break;

            if (!tsuki.isArtist(validators[i])) {
                validators[i] = validators[validators.length - 1];
                validators.pop();
                i--;
            }
        }

        uint256 numVoters = validators.length / 4;
        s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: reqConfirmations,
                callbackGasLimit: callBackGasLim,
                numWords: uint32(numVoters),
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        return submissionId - 1;
    }

    function fulfillRandomWords(
        uint256 /*requestId*/,
        uint256[] calldata randomWords
    ) internal override {
        uint256 numVoters = randomWords.length;
        uint256 numValidators = validators.length;
        uint256 id = submissionId - 1;

        for (uint256 i = 0; i < numVoters; i++) {
            uint256 num = randomWords[i] % numValidators;
            while (votersList[id][validators[num]])
                num = (num + 1) % numValidators;

            votersList[id][validators[num]] = true;
        }
    }

    function voteFor(uint256 id) external payable {
        if (!votersList[id][msg.sender])
            revert Not_Chosen_To_Vote_On_Given_Submission();
        if (hasVoted[id][msg.sender])
            revert Already_Voted_For_Given_Submission();

        Submission storage submission = submissions[id];
        if (submission.state != State.ONGOING)
            revert Voting_Period_For_Given_Submission_Over();

        submission.posVotes++;
        hasVoted[id][msg.sender] = true;
        emit voted(id, msg.sender, "For");

        payable(msg.sender).transfer(reward);
    }

    function voteAgainst(uint256 id) external {
        if (!votersList[id][msg.sender])
            revert Not_Chosen_To_Vote_On_Given_Submission();
        if (hasVoted[id][msg.sender])
            revert Already_Voted_For_Given_Submission();

        Submission storage submission = submissions[id];
        if (submission.state != State.ONGOING)
            revert Voting_Period_For_Given_Submission_Over();

        submission.negVotes++;
        hasVoted[id][msg.sender] = true;
        emit voted(id, msg.sender, "Against");

        payable(msg.sender).transfer(reward);
    }

    function addValidator(address user) external {
        if (msg.sender != address(tsuki))
            revert Not_Allowed_To_Call_Given_Method();

        validators.push(user);
    }

    function removeValidator(address user) external {
        uint256 ind = validators.length;
        for (uint256 i = 0; i < validators.length; i++) {
            if (validators[i] == user) {
                ind = i;
                break;
            }
        }

        if (ind == validators.length) revert Not_A_Validator();

        validators[ind] = validators[validators.length - 1];
        validators.pop();
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        return (
            (submissions.length > 0) &&
                (block.timestamp >= submissions[currId].deadLine),
            "0x0"
        );
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        execute(currId);
    }

    function execute(uint256 id) internal {
        Submission storage submission = submissions[id];
        if (submission.posVotes >= submission.negVotes) {
            submission.state = State.ACCEPTED;
            tsuki.approveNew(submission.metadata);
            payable(submission.sender).transfer(acceptanceReward);
            emit executed(id, "ACCEPTED");
        } else {
            submission.state = State.REJECTED;
            emit executed(id, "REJECTED");
        }

        currId++;
    }
}
