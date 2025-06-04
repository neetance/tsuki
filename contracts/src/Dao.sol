
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ArtistSubscription} from "./ArtistSubscription.sol";
import {ArtistSubmission} from "./ArtistSubmission.sol";
import {TsukiNFT} from "./TsukiNFT.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {console} from "../lib/forge-std/src/console.sol";

contract Dao is Ownable {
    // Errors
    error Forbidden();
    error Only_Artist_Can_Vote();
    error Already_Voted();
    error Proposal_Expired();
    error Proposal_Ongoing();

    // Events
    event ProposalExecuted(uint256 indexed submissionId, bool success);
    event ProposalCreated(
        uint256 indexed submissionId,
        uint256 timestamp,
        uint256 deadline
    );
    event VoteCast(
        uint256 indexed submissionId,
        address indexed voter,
        bool vote
    );

    // State variables
    mapping(uint256 => Proposal) public s_proposals; // Maps submission IDs to proposals.
    mapping(uint256 => mapping(address => bool)) public s_voted; // Tracks if an address has already voted on a submission.

    ArtistSubmission public s_artistSubmission;
    ArtistSubscription public s_artistSubscription;
    TsukiNFT public s_tsukiNFT;

    // Structs
    struct Proposal {
        uint256 submissionId;
        uint256 timestamp;
        uint256 posVotes;
        uint256 negVotes;
        uint256 deadline;
    }

    constructor(
        address _artistSubmission,
        address _artistSubscription,
        address _tsukiNFT,
        address _owner
    ) Ownable(_owner) {
        s_artistSubscription = ArtistSubscription(_artistSubscription);
        s_artistSubmission = ArtistSubmission(_artistSubmission);
        s_tsukiNFT = TsukiNFT(_tsukiNFT);
    }

    // Functions

    /**
     * @dev Creates a new proposal for a submission.
     * @param _submission The submission details to create a proposal for.
     * Note: This function can only be called by the ArtistSubmission contract.
     */
    function newSubmissionProposal(
        ArtistSubmission.Submission memory _submission
    ) public {
        if (msg.sender != address(s_artistSubmission)) revert Forbidden(); // Only the ArtistSubmission contract can call this.

        s_proposals[_submission.id] = Proposal({
            submissionId: _submission.id,
            timestamp: _submission.timestamp,
            posVotes: 0,
            negVotes: 0,
            deadline: block.timestamp + 7 days
        });

        emit ProposalCreated(
            _submission.id,
            _submission.timestamp,
            block.timestamp + 7 days
        );
    }

    /**
     * @dev Casts a vote on a proposal.
     * @param _submissionId The ID of the submission to vote on.
     * @param _vote True for a positive vote, false for a negative vote.
     * Note: Only artists who are subscribed can vote.
     */
    function castVote(uint256 _submissionId, bool _vote) public {
        if (!s_artistSubscription.isArtistSubscribed(msg.sender)) {
            revert Only_Artist_Can_Vote();
        }
        if (s_voted[_submissionId][msg.sender]) revert Already_Voted();

        Proposal storage proposal = s_proposals[_submissionId];
        if (proposal.deadline < block.timestamp) revert Proposal_Expired();

        s_voted[_submissionId][msg.sender] = true;
        if (_vote) proposal.posVotes++;
        else proposal.negVotes++;

        emit VoteCast(_submissionId, msg.sender, _vote);
    }

    /**
     * @dev Executes a proposal if the voting period has ended and the proposal is successful.
     * @param _submissionId The ID of the submission to execute the proposal for.
     * Note: Only the DAO owner (admin) can execute proposals.
     */
    function executeProposal(uint256 _submissionId) public onlyOwner {
        // Only DAO owner (admin) can execute proposals
        Proposal storage proposal = s_proposals[_submissionId];
        if (proposal.deadline >= block.timestamp) revert Proposal_Ongoing();
        console.log("soething happens");
        if (proposal.posVotes > proposal.negVotes) {
            ArtistSubmission.Submission memory submission = s_artistSubmission
                .getSubmission(_submissionId);
            s_tsukiNFT.mint(submission.artist, submission.contentHash);
            emit ProposalExecuted(_submissionId, true);
        } else {
            emit ProposalExecuted(_submissionId, false);
        }

        delete s_proposals[_submissionId];
    }
}
