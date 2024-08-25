// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//import {VRFConsumerBaseV2} from "../"
import {VRFConsumerBaseV2} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {AutomationCompatibleInterface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {Tsuki} from "./tsuki.sol";
import {VRFCoordinatorV2Interface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

contract ValidationDAO is VRFConsumerBaseV2, AutomationCompatibleInterface {
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
    event votersChosen(uint256 id, uint256 num);
    event requestedRandomWords(uint256);

    error Not_Chosen_To_Vote_On_Given_Submission();
    error Already_Voted_For_Given_Submission();
    error Voting_Period_For_Given_Submission_Over();
    error Not_A_Validator();
    error Not_Allowed_To_Call_Given_Method();

    uint256 private submissionId = 0;
    uint256 private immutable INTERVAL = 5 days;
    mapping(uint256 submissionid => mapping(address voter => bool voted)) hasVoted;
    mapping(uint256 submissionid => mapping(address validator => bool selected))
        public votersList;
    address[] private validators;
    Submission[] private submissions;
    uint256 s_subscriptionId;
    bytes32 s_keyHash;
    uint16 reqConfirmations = 3;
    uint32 callBackGasLim = 100000;
    uint256 private immutable reward = 0.01 ether;
    uint256 currId = 0;
    uint256 acceptanceReward = 0.1 ether;
    uint16 minReq = 3;
    Tsuki tsuki;
    address vrfCoordinator;
    bool public reqInProcess = false;
    mapping(address => bool) private isvalidator;

    constructor(
        uint256 subscriptionId,
        address vrfcoordinator,
        bytes32 keyHash,
        address tsukiAddr
    ) VRFConsumerBaseV2(vrfcoordinator) {
        vrfCoordinator = vrfcoordinator;
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

        int256 size = int256(validators.length);
        for (int256 i = 0; i < size; i++) {
            if (i == int256(validators.length)) break;

            uint256 ind = uint256(i);

            if (!tsuki.isArtist(validators[ind])) {
                isvalidator[validators[ind]] = false;
                validators[ind] = validators[validators.length - 1];
                validators.pop();
                i--;
            }
        }

        uint256 numVoters = validators.length / 4;
        uint256 reqId = VRFCoordinatorV2Interface(vrfCoordinator)
            .requestRandomWords(
                s_keyHash,
                uint64(s_subscriptionId),
                minReq,
                callBackGasLim,
                uint32(numVoters)
            );
        reqInProcess = true;
        emit requestedRandomWords(reqId);

        return submissionId - 1;
    }

    function fulfillRandomWords(
        uint256 /*requestId*/,
        uint256[] memory randomWords
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

        emit votersChosen(id, numVoters);
        reqInProcess = false;
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
        isvalidator[user] = true;
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
        isvalidator[user] = false;
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

    function getSubmission(uint256 id) public view returns (Submission memory) {
        return submissions[id];
    }

    function isVoter(uint256 id, address user) public view returns (bool) {
        return votersList[id][user];
    }

    function getNumValidators() public returns (uint256) {
        uint256 size = validators.length;
        for (uint256 i = 0; i < size; i++) {
            if (i == validators.length) break;

            if (!tsuki.isArtist(validators[i])) {
                validators[i] = validators[validators.length - 1];
                validators.pop();
                i--;
            }
        }

        return validators.length;
    }

    function isValidator(address user) public view returns (bool) {
        return (tsuki.isArtist(user) && isvalidator[user]);
    }

    function isReq() public view returns (bool) {
        return reqInProcess;
    }

    receive() external payable {}
}
